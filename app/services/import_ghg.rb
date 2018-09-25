class ImportGhg
  PROJECTED_EMISSIONS_FILEPATH = "#{CW_FILES_PREFIX}projected_emissions.csv".freeze

  def call
    cleanup
    import_projected_emissions(S3CSVReader.read(PROJECTED_EMISSIONS_FILEPATH))
  end

  private

  def cleanup
    Ghg::ProjectedEmissionYear.delete_all
    Ghg::ProjectedEmission.delete_all
  end

  def boundary(name)
    name.ends_with?('L') ? 'DOWN' : 'UP'
  end

  # rubocop:disable Metrics/AbcSize
  def import_projected_emissions(content)
    content.each do |row|
      begin
        projected_emission =
          if row[:code].ends_with?('_L') || row[:code].ends_with?('_U')
            ::Ghg::ProjectedEmissionBoundary.create!(iso: row[:iso],
                                                     name: row[:code],
                                                     boundary: boundary(row[:code]))
          else
            ::Ghg::ProjectedEmissionValue.create!(iso: row[:iso],
                                                  name: row[:code])
          end
        row.to_h.except(:iso, :code).each do |year|
          next if year.last.nil?
          ::Ghg::ProjectedEmissionYear.create!(projected_emission: projected_emission,
                                               year: year.first.to_s.to_i,
                                               value: year.last.to_i)
        end
      rescue ActiveRecord::RecordInvalid => invalid
        STDERR.puts "Error importing #{row.to_s.chomp}: #{invalid}"
      end
    end
  end
  # rubocop:enable Metrics/AbcSize
end
