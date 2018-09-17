# == Schema Information
#
# Table name: mitigation_effects
#
#  id          :bigint(8)        not null, primary key
#  theme       :string
#  name        :string
#  coordinator :string
#  effects_1   :string
#  effects_2   :string
#  effects_3   :string
#  effects_4   :string
#  effects_5   :string
#  effects_6   :string
#  effects_7   :string
#  effects_8   :string
#  effects_9   :string
#  effects_10  :string
#  effects_11  :string
#  effects_12  :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

module Api
  module V1
    module Mitigation
      class MitigationEffectSerializer < ActiveModel::Serializer
        attributes :theme, :name, :coordinator, :effects_1, :effects_2,
                   :effects_3, :effects_4, :effects_5, :effects_6, :effects_7,
                   :effects_8, :effects_9, :effects_10, :effects_11, :effects_12
      end
    end
  end
end
