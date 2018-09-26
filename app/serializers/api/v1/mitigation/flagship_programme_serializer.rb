# == Schema Information
#
# Table name: flagship_programmes
#
#  id                     :bigint(8)        not null, primary key
#  mitigation_category_id :integer
#  title                  :string
#  description            :text
#  position               :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#

module Api
  module V1
    module Mitigation
      class FlagshipProgrammeSerializer < ApplicationSerializer
        attributes :description, :position

        belongs_to :flagship_theme,
                   serializer: Api::V1::Mitigation::FlagshipThemeSerializer
      end
    end
  end
end
