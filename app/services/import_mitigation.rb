class ImportMitigation
  MITIGATION_ACTIONS_FILEPATH = "#{CW_FILES_PREFIX}mitigation_actions.csv".freeze
  MITIGATION_EFFECTS_FILEPATH = "#{CW_FILES_PREFIX}mitigation_effects.csv".freeze
  MITIGATION_INDICATORS_FILEPATH = "#{CW_FILES_PREFIX}mitigation_indicators.csv".freeze
  FLAGSHIP_PROGRAMMES_FILEPATH = "#{CW_FILES_PREFIX}flagship_programmes.csv".freeze
  FLAGSHIP_COMPONENTS_FILEPATH = "#{CW_FILES_PREFIX}flagship_components.csv".freeze

  def call
    cleanup
    import_actions(S3CSVReader.read(MITIGATION_ACTIONS_FILEPATH))
    import_effects(S3CSVReader.read(MITIGATION_EFFECTS_FILEPATH))
    import_indicators(S3CSVReader.read(MITIGATION_INDICATORS_FILEPATH))
    import_programmes(S3CSVReader.read(FLAGSHIP_PROGRAMMES_FILEPATH))
    import_components(S3CSVReader.read(FLAGSHIP_COMPONENTS_FILEPATH))
  end

  private

  def cleanup
    Mitigation::FlagshipComponent.delete_all
    Mitigation::FlagshipProgramme.delete_all
    Mitigation::FlagshipTheme.delete_all
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
      cobenefits: row[:cobenefits],
      quantified_effect: row[:quantified_effect].eql?('yes')
    }
  end

  def flagship_programme_attributes(row, flagship_theme_id, position)
    {
      flagship_theme_id: flagship_theme_id,
      sub_programs: row[:sub_programs],
      work_package: row[:work_package],
      outcomes: row[:outcomes],
      position: position
    }
  end

  #  id                    :bigint(8)        not null, primary key
  #  flagship_programme_id :integer
  #  name                  :string           not null
  #  main_activities       :text
  #  lead                  :string
  #  status                :string
  #  milestone             :text
  #  barriers              :text
  #  next_steps            :text
  #  timeframe             :string
  #  support               :text
  #  created_at            :datetime         not null
  #  updated_at            :datetime         not null
  #
  def flagship_component_attributes(row, flagship_programme_id)
    {
      flagship_programme_id: flagship_programme_id,
      name: row[:component],
      main_activities: row[:main_activities],
      lead: row[:lead],
      status: row[:status],
      milestone: row[:milestone],
      barriers: row[:barriers],
      next_steps: row[:next_steps],
      timeframe: row[:timeframe],
      support: row[:support]
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
        mitigation_sector = ::Mitigation::MitigationSector.find_or_create_by!(name: row[:sector])
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

  def import_programmes(content)
    content.each do |row|
      begin
        theme_position = ::Mitigation::FlagshipTheme.order(position: :desc)&.first&.position || 0
        flagship_theme = ::Mitigation::FlagshipTheme.
          where(name: row[:name]).first_or_create!(position: theme_position + 1)
        programme_position = ::Mitigation::FlagshipProgramme.
          order(position: :desc)&.first&.position || 0
        ::Mitigation::FlagshipProgramme.create!(
          flagship_programme_attributes(row, flagship_theme.id, programme_position + 1)
        )
      rescue ActiveRecord::RecordInvalid => invalid
        STDERR.puts "Error importing #{row.to_s.chomp}: #{invalid}"
      end
    end
  end

  def import_components(content)
    content.each do |row|
      begin
        flagship_theme = ::Mitigation::FlagshipTheme.find_by(name: row[:flagship])
        # The flagship theme only has a programme. Maybe we should merge those models
        flagship_programme = flagship_theme.flagship_programmes.first
        ::Mitigation::FlagshipComponent.create!(
          flagship_component_attributes(row, flagship_programme.id)
        )
      rescue ActiveRecord::RecordInvalid => invalid
        STDERR.puts "Error importing #{row.to_s.chomp}: #{invalid}"
      end
    end
  end
end
