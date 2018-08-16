# == Schema Information
#
# Table name: mitigation_actions
#
#  id                           :bigint(8)        not null, primary key
#  mitigation_category_id       :integer
#  name                         :string
#  objectives                   :text
#  status                       :string
#  actor                        :string
#  time_horizon                 :string
#  ghg                          :string
#  estimated_emission_reduction :string
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#

module Api
  module V1
    module Mitigation
      class MitigationActionSerializer < ActiveModel::Serializer
        attributes :name, :objectives, :status, :actor,
                   :time_horizon, :ghg, :estimated_emission_reduction

        belongs_to :mitigation_category,
                   serializer: Api::V1::Mitigation::MitigationCategorySerializer
      end
    end
  end
end
