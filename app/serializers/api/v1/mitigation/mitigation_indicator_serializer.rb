# == Schema Information
#
# Table name: mitigation_indicators
#
#  id         :bigint(8)        not null, primary key
#  code       :string
#  indicator  :string
#  unit       :string
#  cautions   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

module Api
  module V1
    module Mitigation
      class MitigationEffectSerializer < ActiveModel::Serializer
        attributes :code, :indicator, :unit, :cautions
      end
    end
  end
end
