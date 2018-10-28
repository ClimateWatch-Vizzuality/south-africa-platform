# == Schema Information
#
# Table name: mitigation_actions
#
#  id                           :bigint(8)        not null, primary key
#  mitigation_theme_id          :integer
#  name                         :text
#  objectives                   :text
#  mitigation_type              :string
#  status                       :string
#  actor                        :string
#  time_horizon                 :string
#  ghg                          :string
#  estimated_emission_reduction :string
#  cobenefits                   :string
#  quantified_effect            :boolean
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#

module Api
  module V1
    module Mitigation
      class MitigationActionSerializer < ApplicationSerializer
        attributes :name, :objectives, :mitigation_type, :status, :actor,
                   :time_horizon, :ghg, :estimated_emission_reduction,
                   :quantified_effect, :sector, :cobenefits

        belongs_to :mitigation_theme,
                   serializer: Api::V1::Mitigation::MitigationThemeSerializer

        def sector
          object.mitigation_theme.mitigation_sector.name
        end
      end
    end
  end
end
