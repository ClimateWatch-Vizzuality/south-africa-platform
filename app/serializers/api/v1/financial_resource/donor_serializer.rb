module Api
  module V1
    module FinancialResource
      class DonorSerializer < ActiveModel::Serializer
        attributes :name, :description

        has_many :received_supports,
                 serializer: Api::V1::FinancialResource::ReceivedSupportSerializer
      end
    end
  end
end
