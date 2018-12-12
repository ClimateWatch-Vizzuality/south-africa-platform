# == Schema Information
#
# Table name: priorities
#
#  id          :bigint(8)        not null, primary key
#  location_id :integer          not null
#  code        :string           not null
#  value       :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

module NationalCircumstance
  class Priority < ApplicationRecord
    include ::GenericToCsv

    DEV_PRIORITIES_CODES = %w(Dev_priorities_mitigation Dev_priorities_adaptation).freeze
    NATURAL_DISASTERS_CODES = %w(Flood_damage Drough_damage Fire_damage).freeze

    DATA_SOURCE_TO_CODES_MAP = {
      'COGTA2015' => %w(Flood_damage Drough_damage Fire_damage),
      'BUR2' => %w(Dev_priorities_mitigation Dev_priorities_adaptation)
    }.freeze

    validates_presence_of :value, :code
    belongs_to :location
  end
end
