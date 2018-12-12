module Api
  module V1
    module Mitigation
      class MitigationActionCSVSerializer
        def initialize(values)
          @values = Array.wrap(values)
        end

        def to_csv
          excluded_attributes = %w(id mitigation_theme_id created_at updated_at)
          attribute_names = ::Mitigation::MitigationAction.column_names - excluded_attributes
          headers = (%w(theme sector) + attribute_names).map(&:humanize)

          CSV.generate do |csv|
            csv << headers

            @values.each do |value|
              csv << [
                value.mitigation_theme.title,
                value.mitigation_theme.mitigation_sector.name,
                attribute_names.map { |attr_name| value.attributes[attr_name] }
              ].flatten
            end
          end
        end
      end
    end
  end
end
