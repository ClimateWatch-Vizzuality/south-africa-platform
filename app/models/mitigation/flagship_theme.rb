# == Schema Information
#
# Table name: flagship_themes
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  position   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

module Mitigation
  class FlagshipTheme < ApplicationRecord
    include ::GenericToCsv

    validates_presence_of :name, :position
    has_many :flagship_programmes
  end
end
