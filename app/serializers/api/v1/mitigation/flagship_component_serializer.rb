# == Schema Information
#
# Table name: flagship_components
#
#  id                    :bigint(8)        not null, primary key
#  flagship_programme_id :integer
#  name                  :string           not null
#  main_activities       :text
#  lead                  :string
#  status                :string
#  milestone             :text
#  barriers              :text
#  next_steps            :text
#  timeframe             :string
#  support               :text
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

module Api
  module V1
    module Mitigation
      class FlagshipComponentSerializer < ApplicationSerializer
        attributes :id, :name, :main_activities, :lead, :status,
                   :milestone, :barriers, :next_steps, :timeframe, :support

        belongs_to :flagship_programme,
                   serializer: Api::V1::Mitigation::FlagshipProgrammeSerializer
      end
    end
  end
end
