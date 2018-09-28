class ImportNationalCircumstances
  PRIORITIES_FILEPATH = "#{CW_FILES_PREFIX}priorities.csv".freeze
  INDICATORS_FILEPATH = "#{CW_FILES_PREFIX}national_circumstances_indicators.csv".freeze
  NATIONAL_CIRCUMSTANCES_FILEPATH = "#{CW_FILES_PREFIX}national_circumstances.csv".freeze

  def call
    cleanup
    raise 'Locations must be imported first' unless Location.any?
    raise 'Location\'s Members must be imported first' unless LocationMember.any?
    import_indicators(S3CSVReader.read(INDICATORS_FILEPATH))
    import_priorities(S3CSVReader.read(PRIORITIES_FILEPATH))
    import_categories(S3CSVReader.read(NATIONAL_CIRCUMSTANCES_FILEPATH))
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

  def import_categories(content)
    content.each do |row|
      begin
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
                                                       value: year.last,
                                                       category: category)
        end
      rescue ActiveRecord::RecordInvalid => invalid
        STDERR.puts "Error importing #{row.to_s.chomp}: #{invalid}"
      end
    end
  end

  def import_priorities(content)
    content.each do |row|
      begin
        location = Location.find_by(iso_code3: row[:iso3])
        ::NationalCircumstance::Priority.create!(priority_attributes(row, location))
      rescue ActiveRecord::RecordInvalid => invalid
        STDERR.puts "Error importing #{row.to_s.chomp}: #{invalid}"
      end
    end
  end

  def import_indicators(content)
    content.each do |row|
      begin
        ::NationalCircumstance::Indicator.create!(row.to_h)
      rescue ActiveRecord::RecordInvalid => invalid
        STDERR.puts "Error importing #{row.to_s.chomp}: #{invalid}"
      end
    end
  end
end
