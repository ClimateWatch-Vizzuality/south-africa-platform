# == Schema Information
#
# Table name: received_supports
#
#  id            :bigint(8)        not null, primary key
#  donor_id      :integer
#  finance_flow  :string
#  type_funds    :string
#  amount_zar    :bigint(8)
#  amount_usd    :bigint(8)
#  timeframes    :string
#  focus_area_1  :boolean          default(FALSE)
#  focus_area_2  :boolean          default(FALSE)
#  focus_area_3  :boolean          default(FALSE)
#  focus_area_4  :boolean          default(FALSE)
#  focus_area_5  :boolean          default(FALSE)
#  focus_area_6  :boolean          default(FALSE)
#  focus_area_7  :boolean          default(FALSE)
#  focus_area_8  :boolean          default(FALSE)
#  cofinancing   :integer
#  purpose_funds :text
#  program_funds :text
#  outcome_funds :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

module FinancialResource
  class ReceivedSupport < ApplicationRecord
    include ::GenericToCsv

    belongs_to :donor

    validates_presence_of :finance_flow
  end
end
