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
          format.csv do
            send_data projects.to_csv,
                      type: 'text/csv',
                      filename: 'inventory_improvement_projects.csv',
                      disposition: 'attachment'
          end
        end
      end
    end
  end
end
