# == Schema Information
#
# Table name: flagship_programmes
#
#  id                :bigint(8)        not null, primary key
#  sub_programs      :text
#  description       :text
#  position          :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  work_package      :text
#  outcomes          :text
#  flagship_theme_id :integer
#

module Api
  module V1
    module Mitigation
      class FlagshipProgrammeSerializer < ApplicationSerializer
        attributes :id, :description, :position, :sub_programs, :work_package,
                   :outcomes

        belongs_to :flagship_theme,
                   serializer: Api::V1::Mitigation::FlagshipThemeSerializer
        has_many :flagship_components,
                 serializer: Api::V1::Mitigation::FlagshipComponentSerializer
      end
    end
  end
end
