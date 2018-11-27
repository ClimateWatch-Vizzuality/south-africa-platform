module Api
  module V1
    module Mitigation
      class MitigationSectorsController < ApiController
        def index
          values = ::Mitigation::MitigationSector.all

          respond_to do |format|
            format.json do
              render json: values,
                     each_serializer: Api::V1::Mitigation::MitigationSectorSerializer
            end
            format.csv do
              send_data values.to_csv,
                        type: 'text/csv',
                        filename: 'mitigation_sectors.csv',
                        disposition: 'attachment'
            end
          end
        end
      end
    end
  end
end
