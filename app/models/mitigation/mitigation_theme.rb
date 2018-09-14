# == Schema Information
#
# Table name: mitigation_themes
#
#  id                   :bigint(8)        not null, primary key
#  title                :string
#  position             :integer
#  mitigation_sector_id :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

module Mitigation
  class MitigationTheme < ApplicationRecord
    include ::GenericToCsv

    validates_presence_of :position
    belongs_to :mitigation_sector
    has_many :mitigation_actions
    has_many :flagship_programmes
  end
end
