class ImportMitigation
  MITIGATION_ACTIONS_FILEPATH = "#{CW_FILES_PREFIX}mitigation_actions.csv".freeze
  MITIGATION_EFFECTS_FILEPATH = "#{CW_FILES_PREFIX}mitigation_effects.csv".freeze
  MITIGATION_INDICATORS_FILEPATH = "#{CW_FILES_PREFIX}mitigation_indicators.csv".freeze
  FLAGSHIP_PROGRAMMES_FILEPATH = "#{CW_FILES_PREFIX}flagship_programmes.csv".freeze

  def call
    cleanup
    import_actions(S3CSVReader.read(MITIGATION_ACTIONS_FILEPATH))
    import_programmes(S3CSVReader.read(FLAGSHIP_PROGRAMMES_FILEPATH))
    import_effects(S3CSVReader.read(MITIGATION_EFFECTS_FILEPATH))
    import_indicators(S3CSVReader.read(MITIGATION_INDICATORS_FILEPATH))
  end

  private

  def cleanup
    Mitigation::FlagshipProgramme.delete_all
    Mitigation::MitigationAction.delete_all
    Mitigation::MitigationTheme.delete_all
    Mitigation::MitigationSector.delete_all
    Mitigation::MitigationEffect.delete_all
    Mitigation::MitigationIndicator.delete_all
  end

  def action_attributes(row, mitigation_theme_id)
    {
      mitigation_theme_id: mitigation_theme_id,
      name: row[:name],
      objectives: row[:objective],
      mitigation_type: row[:type],
      status: row[:status],
      actor: row[:agency],
      time_horizon: row[:timehorizon],
      ghg: row[:ghg],
      estimated_emission_reduction: row[:reductions],
      cobenefits: row[:cobenefits]
    }
  end

  def mitigation_theme(mitigation_sector, row)
    mitigation_theme = ::Mitigation::MitigationTheme.find_by(title: row[:theme],
                                                             mitigation_sector: mitigation_sector)
    return mitigation_theme if mitigation_theme
    position = ::Mitigation::MitigationTheme.order(position: :desc)&.first&.position || 0
    position += 1
    Mitigation::MitigationTheme.create!(
      title: row[:theme],
      position: position,
      mitigation_sector: mitigation_sector
    )
  end

  def import_actions(content)
    content.each do |row|
      begin
        mitigation_sector = ::Mitigation::MitigationSector.first_or_create!(name: row[:sector])
        mitigation_theme = mitigation_theme(mitigation_sector, row)
        ::Mitigation::MitigationAction.create!(action_attributes(row, mitigation_theme.id))
      rescue ActiveRecord::RecordInvalid => invalid
        STDERR.puts "Error importing #{row.to_s.chomp}: #{invalid}"
      end
    end
  end

  def import_effects(content)
    content.each do |row|
      begin
        ::Mitigation::MitigationEffect.create!(row.to_h)
      rescue ActiveRecord::RecordInvalid => invalid
        STDERR.puts "Error importing #{row.to_s.chomp}: #{invalid}"
      end
    end
  end

  def import_indicators(content)
    content.each do |row|
      begin
        ::Mitigation::MitigationIndicator.create!(row.to_h)
      rescue ActiveRecord::RecordInvalid => invalid
        STDERR.puts "Error importing #{row.to_s.chomp}: #{invalid}"
      end
    end
  end

  # TODO: The documents provided don't contain enough information to import the programmes
  def import_programmes(content); end
end
