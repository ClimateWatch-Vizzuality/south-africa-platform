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

module Api
  module V1
    module NationalCircumstance
      class PrioritySerializer < ApplicationSerializer
        attributes :code, :value

        belongs_to :location,
                   serializer: Locations::LocationNanoSerializer
      end
    end
  end
end
