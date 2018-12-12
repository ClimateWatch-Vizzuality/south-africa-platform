module Api
  module V1
    module Mitigation
      class MitigationActionsController < ApiController
        def index
          values = ::Mitigation::MitigationAction.includes(mitigation_theme: [:mitigation_sector])

          respond_to do |format|
            format.json do
              render json: values,
                     each_serializer: MitigationActionSerializer
            end
            format.zip do
              data_sources = DataSource.all
              data_sources = data_sources.where(short_title: sources) if sources

              render zip: {
                'mitigation_actions.csv' => MitigationActionCSVSerializer.new(values).to_csv,
                'data_sources.csv' => data_sources.to_csv
              }
            end
          end
        end

        private

        def sources
          params[:sources].presence && params[:sources].split(',')
        end
      end
    end
  end
end
