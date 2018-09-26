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

module Mitigation
  class FlagshipComponent < ApplicationRecord
    include ::GenericToCsv

    validates_presence_of :name
    belongs_to :flagship_programme
  end
end
