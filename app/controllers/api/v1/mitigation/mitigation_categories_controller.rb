module Api
  module V1
    module Mitigation
      class MitigationCategoriesController < ApiController
        def index
          values = ::Mitigation::MitigationCategory.all

          render json: values,
                 each_serializer: Api::V1::Mitigation::MitigationCategorySerializer
        end
      end
    end
  end
end
