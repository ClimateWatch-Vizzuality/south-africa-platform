# == Schema Information
#
# Table name: mitigation_actions
#
#  id                           :bigint(8)        not null, primary key
#  mitigation_theme_id          :integer
#  text                         :string
#  objectives                   :text
#  mitigation_type              :string
#  status                       :string
#  actor                        :string
#  time_horizon                 :string
#  ghg                          :string
#  estimated_emission_reduction :string
#  cobenefits                   :string
#  bur1                         :boolean
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#

module Mitigation
  class MitigationAction < ApplicationRecord
    validates_presence_of :name
    belongs_to :mitigation_theme
  end
end
