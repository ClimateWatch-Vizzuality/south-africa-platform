# == Schema Information
#
# Table name: projected_emission_years
#
#  id                    :bigint(8)        not null, primary key
#  value                 :integer
#  year                  :integer
#  projected_emission_id :bigint(8)
#
# Indexes
#
#  index_projected_emission_years_on_projected_emission_id  (projected_emission_id)
#
# Foreign Keys
#
#  fk_rails_...  (projected_emission_id => projected_emissions.id)
#

module Ghg
  class ProjectedEmissionYear < ApplicationRecord
    include ::GenericToCsv

    validates_presence_of :year, :value
    belongs_to :projected_emission
  end
end
