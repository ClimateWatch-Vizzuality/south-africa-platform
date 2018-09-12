module Api
  module V1
    module Mitigation
      class FlagshipProgrammesController < ApiController
        def index
          values = ::Mitigation::FlagshipProgramme.all

          respond_to do |format|
            format.json do
              render json: values,
                     each_serializer: Api::V1::Mitigation::FlagshipProgrammeSerializer
            end
            format.csv do
              send_data values.to_csv,
                        type: 'text/csv',
                        filename: 'flagship_programmes.csv',
                        disposition: 'attachment'
            end
          end
        end
      end
    end
  end
end
