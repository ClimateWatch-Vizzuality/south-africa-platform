# == Schema Information
#
# Table name: support_needs
#
#  id           :bigint(8)        not null, primary key
#  category     :string
#  focus_area   :string
#  reference    :string
#  support_type :string
#  scheme       :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

module Api
  module V1
    module FinancialResource
      class SupportNeedSerializer < ApplicationSerializer
        attributes :id, :support_type
        attribute :category, key: :type
        attribute :focus_area, key: :sector_and_activity
        attribute :reference, key: :reference_to_policies_and_measures
        attribute :scheme, key: :preferred_type
      end
    end
  end
end
