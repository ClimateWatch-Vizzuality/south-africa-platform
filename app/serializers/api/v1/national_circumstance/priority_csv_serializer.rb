module Api
  module V1
    module NationalCircumstance
      class PriorityCSVSerializer
        def initialize(priorities)
          @priorities = Array.wrap(priorities)
        end

        def to_csv
          headers = %w(location code value)

          CSV.generate do |csv|
            csv << headers

            @priorities.each do |priority|
              csv << [
                priority.location.wri_standard_name,
                priority.code,
                priority.value
              ]
            end
          end
        end
      end
    end
  end
end
