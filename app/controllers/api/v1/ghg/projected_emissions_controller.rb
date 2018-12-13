module Api
  module V1
    module Ghg
      class ProjectedEmissionsController < ApiController
        def index
          values = ::Ghg::ProjectedEmission.includes(:projected_emission_years)
          metadata = ::Ghg::ProjectedEmissionMetadata.all

          respond_to do |format|
            format.json do
              render json: ProjectedEmissionSerializer.new(values, metadata).to_json
            end
            format.zip do
              data_sources = DataSource.all
              data_sources = data_sources.where(short_title: sources) if sources

              render zip: {
                'projected_emissions.csv' =>
                  ProjectedEmissionCSVSerializer.new(values).to_csv,
                'indicators.csv' => metadata.to_csv,
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
