# == Schema Information
#
# Table name: projected_emissions
#
#  id         :bigint(8)        not null, primary key
#  iso        :string
#  name       :string
#  type       :string
#  boundary   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

module Ghg
  class ProjectedEmission < ApplicationRecord
    abstract_class
    include ::GenericToCsv

    validates_presence_of :name, :type
    has_many :projected_emission_years
  end
end
