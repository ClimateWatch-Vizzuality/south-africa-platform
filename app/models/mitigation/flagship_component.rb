# == Schema Information
#
# Table name: flagship_components
#
#  id                    :bigint(8)        not null, primary key
#  barriers              :text
#  lead                  :string
#  main_activities       :text
#  milestone             :text
#  name                  :string           not null
#  next_steps            :text
#  status                :string
#  support               :text
#  timeframe             :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  flagship_programme_id :integer
#
# Foreign Keys
#
#  fk_rails_...  (flagship_programme_id => flagship_programmes.id)
#

module Mitigation
  class FlagshipComponent < ApplicationRecord
    include ::GenericToCsv

    validates_presence_of :name
    belongs_to :flagship_programme
  end
end
