module Api
  module V1
    module Mitigation
      class MitigationSectorsController < ApiController
        def index
          values = ::Mitigation::MitigationSector.all

          render json: values,
                 each_serializer: Api::V1::Mitigation::MitigationSectorSerializer
        end
      end
    end
  end
end
