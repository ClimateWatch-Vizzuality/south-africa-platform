module Api
  module V1
    module NationalCircumstance
      class CategoryGroupsController < ApiController
        def index
          values = ::NationalCircumstance::CategoryGroup.all

          respond_to do |format|
            format.json do
              render json: values,
                     each_serializer: Api::V1::NationalCircumstance::CategoryGroupSerializer,
                     meta: ::NationalCircumstance::Indicator.all.
                       as_json(except: %w[id created_at updated_at])
            end
            format.csv do
              send_data values.to_csv,
                        type: 'text/csv',
                        filename: 'category_groups.csv',
                        disposition: 'attachment'
            end
          end
        end
      end
    end
  end
end
