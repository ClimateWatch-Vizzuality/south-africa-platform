module Api
  module V1
    module Mitigation
      class MitigationThemesController < ApiController
        def index
          values = ::Mitigation::MitigationTheme.all

          render json: values,
                 each_serializer: Api::V1::Mitigation::MitigationThemeSerializer
        end
      end
    end
  end
end
