class ImportNationalCircumstances
  include ClimateWatchEngine::CSVImporter

  PRIORITIES_FILEPATH = "#{CW_FILES_PREFIX}national_circumstances/priorities.csv".freeze
  INDICATORS_FILEPATH = "#{CW_FILES_PREFIX}national_circumstances/national_circumstances_indicators.csv".freeze
  NATIONAL_CIRCUMSTANCES_FILEPATH = "#{CW_FILES_PREFIX}national_circumstances/national_circumstances.csv".freeze

  def call
    ActiveRecord::Base.transaction do
      raise 'Locations must be imported first' unless Location.any?
      raise 'Location\'s Members must be imported first' unless LocationMember.any?
      cleanup
      import_indicators(S3CSVReader.read(INDICATORS_FILEPATH), INDICATORS_FILEPATH)
      import_priorities(S3CSVReader.read(PRIORITIES_FILEPATH), PRIORITIES_FILEPATH)
      import_categories(S3CSVReader.read(NATIONAL_CIRCUMSTANCES_FILEPATH), NATIONAL_CIRCUMSTANCES_FILEPATH)
    end
  end

  private

  def cleanup
    NationalCircumstance::Priority.delete_all
    NationalCircumstance::Indicator.delete_all
    NationalCircumstance::CategoryYear.delete_all
    NationalCircumstance::Category.delete_all
    NationalCircumstance::CategoryGroup.delete_all
  end

  def priority_attributes(row, location)
    {
      location: location,
      code: row[:code],
      value: row[:value]
    }
  end

  def import_categories(csv, file_path)
    import_each_with_logging(csv, file_path) do |row|
      category_group =
        ::NationalCircumstance::CategoryGroup.find_or_create_by!(name: row[:category_group])
      location = Location.find_by(iso_code3: row[:code3])
      category =
        ::NationalCircumstance::Category.create!(name: row[:code],
                                                 category_group: category_group,
                                                 location: location)
      row.to_h.except(:category_group, :code, :code3).each do |year|
        next if year.last.nil?
        ::NationalCircumstance::CategoryYear.create!(year: year.first.to_s.to_i,
                                                     value: year.last.delete(',').to_f,
                                                     category: category)
      end
    end
  end

  def import_priorities(csv, file_path)
    import_each_with_logging(csv, file_path) do |row|
      location = Location.find_by(iso_code3: row[:iso3])
      ::NationalCircumstance::Priority.create!(priority_attributes(row, location))
    end
  end

  def import_indicators(csv, file_path)
    import_each_with_logging(csv, file_path) do |row|
      ::NationalCircumstance::Indicator.create!(row.to_h)
    end
  end
end
