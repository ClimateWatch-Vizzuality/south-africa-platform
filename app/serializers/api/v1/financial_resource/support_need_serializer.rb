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
        attributes :id, :category, :focus_area, :reference, :support_type, :scheme
      end
    end
  end
end
