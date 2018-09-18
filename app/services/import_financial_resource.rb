class ImportFinancialResource
  SUPPORT_NEEDS_FILEPATH = "#{CW_FILES_PREFIX}support_needs.csv".freeze

  def call
    cleanup
    import_support_needs(S3CSVReader.read(SUPPORT_NEEDS_FILEPATH))
  end

  private

  def cleanup
    FinancialResource::SupportNeed.delete_all
  end

  def import_support_needs(content)
    content.each do |row|
      begin
        ::FinancialResource::SupportNeed.create!(row.to_h)
      rescue ActiveRecord::RecordInvalid => invalid
        STDERR.puts "Error importing #{row.to_s.chomp}: #{invalid}"
      end
    end
  end
end
