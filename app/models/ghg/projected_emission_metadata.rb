# == Schema Information
#
# Table name: projected_emission_metadata
#
#  id         :bigint(8)        not null, primary key
#  code       :string           not null
#  indicator  :string           not null
#  unit       :string
#  definition :text
#  program    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

module Ghg
  class ProjectedEmissionMetadata < ApplicationRecord
    include ::GenericToCsv

    validates_presence_of :code, :indicator
  end
end
