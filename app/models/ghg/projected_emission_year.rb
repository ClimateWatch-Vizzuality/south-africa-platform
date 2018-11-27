# == Schema Information
#
# Table name: projected_emission_years
#
#  id                    :bigint(8)        not null, primary key
#  year                  :integer
#  value                 :integer
#  projected_emission_id :bigint(8)
#

module Ghg
  class ProjectedEmissionYear < ApplicationRecord
    include ::GenericToCsv

    validates_presence_of :year, :value
    belongs_to :projected_emission
  end
end
