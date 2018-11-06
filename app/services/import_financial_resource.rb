class ImportFinancialResource
  SUPPORT_NEEDS_FILEPATH = "#{CW_FILES_PREFIX}financial_resources/support_needs.csv".freeze
  RECEIVED_SUPPORTS_FILEPATH = "#{CW_FILES_PREFIX}financial_resources/support_received.csv".freeze
  INDICATORS_FILEPATH = "#{CW_FILES_PREFIX}financial_resources/financial_indicators.csv".freeze

  def call
    cleanup
    import_support_needs(S3CSVReader.read(SUPPORT_NEEDS_FILEPATH))
    import_received_supports(S3CSVReader.read(RECEIVED_SUPPORTS_FILEPATH))
    import_indicators(S3CSVReader.read(INDICATORS_FILEPATH))
  end

  private

  def cleanup
    FinancialResource::SupportNeed.delete_all
    FinancialResource::ReceivedSupport.delete_all
    FinancialResource::Indicator.delete_all
  end

  def positive_cell?(cell)
    %w[yes X].include?(cell) ? true : false
  end

  # rubocop:disable Metrics/AbcSize
  def received_support_attributes(row)
    {
      donor: FinancialResource::Donor.find_or_create_by!(name: row[:donor]),
      finance_flow: row[:finance_flow],
      type_funds: row[:type_funds],
      amount_zar: row[:amount_zar],
      amount_usd: row[:amount_usd],
      focus_area_1: positive_cell?(row[:focus_area_1]),
      focus_area_2: positive_cell?(row[:focus_area_2]),
      focus_area_3: positive_cell?(row[:focus_area_3]),
      focus_area_4: positive_cell?(row[:focus_area_4]),
      focus_area_5: positive_cell?(row[:focus_area_5]),
      focus_area_6: positive_cell?(row[:focus_area_6]),
      focus_area_7: positive_cell?(row[:focus_area_7]),
      focus_area_8: positive_cell?(row[:focus_area_8]),
      cofinancing: row[:co_financing],
      purpose_funds: row[:purpose_funds],
      program_funds: row[:program_funds],
      outcome_funds: row[:outcome_funds]
    }
  end
  # rubocop:enable Metrics/AbcSize

  def import_support_needs(content)
    content.each do |row|
      begin
        ::FinancialResource::SupportNeed.create!(row.to_h)
      rescue ActiveRecord::RecordInvalid => invalid
        STDERR.puts "Error importing #{row.to_s.chomp}: #{invalid}"
      end
    end
  end

  def import_received_supports(content)
    content.each do |row|
      begin
        ::FinancialResource::ReceivedSupport.create!(received_support_attributes(row))
      rescue ActiveRecord::RecordInvalid => invalid
        STDERR.puts "Error importing #{row.to_s.chomp}: #{invalid}"
      end
    end
  end

  def import_indicators(content)
    content.each do |row|
      begin
        ::FinancialResource::Indicator.create!(row.to_h)
      rescue ActiveRecord::RecordInvalid => invalid
        STDERR.puts "Error importing #{row.to_s.chomp}: #{invalid}"
      end
    end
  end
end
