# == Schema Information
#
# Table name: received_supports
#
#  id            :bigint(8)        not null, primary key
#  donor_id      :integer
#  finance_flow  :string
#  type_funds    :string
#  amount_zar    :integer
#  amount_usd    :integer
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
#

module FinancialResource
  class ReceivedSupport < ApplicationRecord
    include ::GenericToCsv

    belongs_to :donor

    validates_presence_of :finance_flow, :type_funds
  end
end
