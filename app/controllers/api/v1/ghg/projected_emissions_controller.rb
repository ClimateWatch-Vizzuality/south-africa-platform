module Api
  module V1
    module Ghg
      class ProjectedEmissionsController < ApiController
        def index
          values = ::Ghg::ProjectedEmission.all

          respond_to do |format|
            format.json do
              render json: values,
                     each_serializer: serializer
            end
            format.csv do
              send_data values.to_csv,
                        type: 'text/csv',
                        filename: 'projected_emissions.csv',
                        disposition: 'attachment'
            end
          end
        end

        private

        def serializer; end
      end
    end
  end
end
