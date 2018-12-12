module Api
  module V1
    class InventoryImprovementProjectsController < ApiController
      def index
        projects = ::InventoryImprovement::Project.all

        respond_to do |format|
          format.json do
            render json: projects,
                   each_serializer: Api::V1::InventoryImprovement::ProjectSerializer
          end
          format.zip do
            data_sources = DataSource.all
            data_sources = data_sources.where(short_title: sources) if sources

            render zip: {
              'inventory_improvement_projects.csv' => projects.to_csv,
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
