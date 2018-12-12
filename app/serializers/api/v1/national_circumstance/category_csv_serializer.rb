module Api
  module V1
    module NationalCircumstance
      class CategoryCSVSerializer < ApplicationSerializer
        def initialize(categories)
          @categories = Array.wrap(categories)
          @indicators = ::NationalCircumstance::Indicator.all
        end

        # rubocop:disable Metrics/AbcSize
        def to_csv
          year_columns = @categories.flat_map(&:category_years).map(&:year).uniq.sort

          headers = %w(group code indicator category unit location).concat(year_columns)

          CSV.generate do |csv|
            csv << headers

            @categories.each do |category|
              indicator = @indicators.select { |i| i.code == category.name }.first

              csv << [
                category.category_group.name,
                category.name,
                indicator&.indicator,
                indicator&.category,
                indicator&.unit,
                category.location.wri_standard_name,
                year_columns.map do |year|
                  category.category_years.select { |cy| cy.year == year }.map(&:value)
                end
              ].flatten
            end
          end
        end
        # rubocop:enable Metrics/AbcSize
      end
    end
  end
end
