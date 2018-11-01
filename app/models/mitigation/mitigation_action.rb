# == Schema Information
#
# Table name: mitigation_actions
#
#  id                           :bigint(8)        not null, primary key
#  actor                        :string
#  cobenefits                   :string
#  estimated_emission_reduction :string
#  ghg                          :string
#  mitigation_type              :string
#  name                         :text
#  objectives                   :text
#  quantified_effect            :boolean
#  status                       :string
#  time_horizon                 :string
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#  mitigation_theme_id          :integer
#
# Indexes
#
#  index_mitigation_actions_on_actor   (actor)
#  index_mitigation_actions_on_ghg     (ghg)
#  index_mitigation_actions_on_status  (status)
#
# Foreign Keys
#
#  fk_rails_...  (mitigation_theme_id => mitigation_themes.id)
#

module Mitigation
  class MitigationAction < ApplicationRecord
    include ::GenericToCsv

    validates_presence_of :name
    belongs_to :mitigation_theme
  end
end
