module Api
  module V1
    module Ghg
      class ProjectedEmissionsController < ApiController
        def index
          values = ::Ghg::ProjectedEmission.all
          metadata = ::Ghg::ProjectedEmissionMetadata.all

          respond_to do |format|
            format.json do
              render json: ProjectedEmissionSerializer.new(values, metadata).to_json
            end
            format.csv do
              send_data values.to_csv,
                        type: 'text/csv',
                        filename: 'projected_emissions.csv',
                        disposition: 'attachment'
            end
          end
        end
      end
    end
  end
end
