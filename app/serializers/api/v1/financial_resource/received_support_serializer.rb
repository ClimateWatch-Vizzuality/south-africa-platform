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

module Api
  module V1
    module FinancialResource
      class ReceivedSupportSerializer < ActiveModel::Serializer
        attributes :finance_flow, :amount_zar, :amount_usd, :timeframes,
                   :focus_area_1, :focus_area_2, :focus_area_3, :focus_area_4,
                   :focus_area_5, :focus_area_6, :focus_area_7, :focus_area_8,
                   :cofinancing, :purpose_funds, :program_funds, :outcome_funds

        belongs_to :donors,
                   serializer: Api::V1::FinancialResource::DonorSerializer
      end
    end
  end
end
