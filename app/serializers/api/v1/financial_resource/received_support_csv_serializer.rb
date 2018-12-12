module Api
  module V1
    module FinancialResource
      class ReceivedSupportCSVSerializer < ApplicationSerializer
        def initialize(values)
          @values = Array.wrap(values)
        end

        def to_csv
          attribute_names = ::FinancialResource::ReceivedSupport.column_names - %w(id donor_id created_at updated_at)
          headers = (['donor'] + attribute_names).map(&:humanize)

          CSV.generate do |csv|
            csv << headers

            @values.each do |value|
              csv << [
                value.donor.name,
                attribute_names.map { |attr_name| value.attributes[attr_name] }
              ].flatten
            end
          end
        end
      end
    end
  end
end
