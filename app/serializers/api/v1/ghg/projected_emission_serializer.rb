module Api
  module V1
    module Ghg
      class ProjectedEmissionSerializer < ApplicationSerializer
        def initialize(values, metadata)
          @metadata = metadata
          @serialized =
            values.map do |pe|
              type = pe.type
              case type
              when 'Ghg::ProjectedEmissionValue'
                ProjectedEmissionValueSerializer.new(pe).as_json
              when 'Ghg::ProjectedEmissionBoundary'
                ProjectedEmissionBoundarySerializer.new(pe).as_json
              else raise ArgumentError, "Unhandled event type: #{pe.type}"
              end
            end
        end

        def to_json
          JSON.dump(data: @serialized,
                    meta: @metadata.as_json(except: [:id, :created_at, :updated_at]))
        end
      end
    end
  end
end
