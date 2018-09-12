# == Schema Information
#
# Table name: mitigation_sectors
#
#  id          :bigint(8)        not null, primary key
#  name        :string
#  description :text
#  position    :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

module Mitigation
  class MitigationSector < ApplicationRecord
    include ::GenericToCsv

    validates_presence_of :name
    has_many :mitigation_themes
  end
end
