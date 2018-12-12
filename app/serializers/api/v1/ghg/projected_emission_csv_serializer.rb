module Api
  module V1
    module Ghg
      class ProjectedEmissionCSVSerializer
        def initialize(values)
          @values = Array.wrap(values)
        end

        def to_csv
          year_columns = @values.flat_map(&:projected_emission_years).map(&:year).uniq.sort

          headers = %w(indicator_code boundary) + year_columns

          CSV.generate do |csv|
            csv << headers

            @values.each do |value|
              csv << [
                value.name,
                value.boundary,
                year_columns.map do |year|
                  value.projected_emission_years.select { |pey| pey.year == year }.map(&:value)
                end
              ].flatten
            end
          end
        end
      end
    end
  end
end
