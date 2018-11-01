# == Schema Information
#
# Table name: mitigation_themes
#
#  id                   :bigint(8)        not null, primary key
#  position             :integer
#  title                :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  mitigation_sector_id :integer
#
# Foreign Keys
#
#  fk_rails_...  (mitigation_sector_id => mitigation_sectors.id)
#

module Mitigation
  class MitigationTheme < ApplicationRecord
    include ::GenericToCsv

    validates_presence_of :position
    belongs_to :mitigation_sector
    has_many :mitigation_actions
  end
end
