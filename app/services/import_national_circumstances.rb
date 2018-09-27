class ImportNationalCircumstances
  PRIORITIES_FILEPATH = "#{CW_FILES_PREFIX}priorities.csv".freeze
  INDICATORS_FILEPATH = "#{CW_FILES_PREFIX}national_circumstances_indicators.csv".freeze

  def call
    cleanup
    raise 'Locations must be imported first' unless Location.any?
    raise 'Location\'s Members must be imported first' unless LocationMember.any?
    import_indicators(S3CSVReader.read(INDICATORS_FILEPATH))
    import_priorities(S3CSVReader.read(PRIORITIES_FILEPATH))
  end

  private

  def cleanup
    NationalCircumstance::Priority.delete_all
  end

  def priority_attributes(row, location)
    {
      location: location,
      code: row[:code],
      value: row[:value]
    }
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
