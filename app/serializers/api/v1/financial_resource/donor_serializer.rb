# == Schema Information
#
# Table name: donors
#
#  id          :bigint(8)        not null, primary key
#  name        :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

module Api
  module V1
    module FinancialResource
      class DonorSerializer < ApplicationSerializer
        attributes :id, :name, :description

        has_many :received_supports,
                 serializer: Api::V1::FinancialResource::ReceivedSupportSerializer
      end
    end
  end
end
