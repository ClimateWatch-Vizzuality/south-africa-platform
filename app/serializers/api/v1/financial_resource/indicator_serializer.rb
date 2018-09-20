module Api
  module V1
    module FinancialResource
      class IndicatorSerializer < ActiveModel::Serializer
        attributes :code, :indicator, :category,
                   :indicator_type, :unit
      end
    end
  end
end
