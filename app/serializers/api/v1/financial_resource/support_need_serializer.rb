module Api
  module V1
    module FinancialResource
      class SupportNeedSerializer < ActiveModel::Serializer
        attributes :category, :focus_area, :reference, :support_type, :scheme
      end
    end
  end
end
