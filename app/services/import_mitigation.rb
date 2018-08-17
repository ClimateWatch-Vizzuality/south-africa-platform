class ImportMitigation
  # rubocop:disable LineLength
  MITIGATION_CATEGORIES_FILEPATH = 'public/mocks/mitigation_categories.json'.freeze
  MITIGATION_ACTIONS_FILEPATH = "#{CW_FILES_PREFIX}3. Mitigation/Table 27 - Additional mitigation actions in energy sector not in BUR1 - Sheet1.csv".freeze
  FLAGSHIP_PROGRAMMES_FILEPATH = nil # FIXME: Still no data available
  # rubocop:enable LineLength

  def call
    cleanup
    create_categories
    import_actions(S3CSVReader.read(MITIGATION_ACTIONS_FILEPATH))
  end

  private

  def cleanup
    Mitigation::FlagshipProgramme.delete_all
    Mitigation::MitigationAction.delete_all
    Mitigation::MitigationCategory.delete_all
  end

  def create_categories
    json = JSON.parse(File.read(File.join(Rails.root, MITIGATION_CATEGORIES_FILEPATH)))
    json.each do |category|
      ::Mitigation::MitigationCategory.create(category)
    end
  end

  def action_attributes(row)
    {
      # mitigation_category_id: ::Mitigation::MitigationCategory.find_by(name: row[0]),
      mitigation_category_id: 1, # FIXME: Mock. To replace when the csv are final
      name: row[0],
      objectives: row[1],
      status: row[2],
      actor: row[3],
      time_horizon: row[4],
      ghg: row[5],
      estimated_emission_reduction: row[6]
    }
  end

  def import_actions(content)
    content.each do |row|
      begin
        ::Mitigation::MitigationAction.create!(action_attributes(row))
      rescue ActiveRecord::RecordInvalid => invalid
        STDERR.puts "Error importing #{row.to_s.chomp}: #{invalid}"
      end
    end
  end
end
