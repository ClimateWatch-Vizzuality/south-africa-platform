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

module FinancialResource
  class SupportNeed < ApplicationRecord
    include ::GenericToCsv

    validates_presence_of :category, :focus_area
  end
end
