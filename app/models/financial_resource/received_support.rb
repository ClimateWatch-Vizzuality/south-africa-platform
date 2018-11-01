# == Schema Information
#
# Table name: received_supports
#
#  id            :bigint(8)        not null, primary key
#  amount_usd    :bigint(8)
#  amount_zar    :bigint(8)
#  cofinancing   :integer
#  finance_flow  :string
#  focus_area_1  :boolean          default(FALSE)
#  focus_area_2  :boolean          default(FALSE)
#  focus_area_3  :boolean          default(FALSE)
#  focus_area_4  :boolean          default(FALSE)
#  focus_area_5  :boolean          default(FALSE)
#  focus_area_6  :boolean          default(FALSE)
#  focus_area_7  :boolean          default(FALSE)
#  focus_area_8  :boolean          default(FALSE)
#  outcome_funds :text
#  program_funds :text
#  purpose_funds :text
#  timeframes    :string
#  type_funds    :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  donor_id      :integer
#
# Indexes
#
#  index_received_supports_on_finance_flow  (finance_flow)
#  index_received_supports_on_type_funds    (type_funds)
#
# Foreign Keys
#
#  fk_rails_...  (donor_id => donors.id)
#

module FinancialResource
  class ReceivedSupport < ApplicationRecord
    include ::GenericToCsv

    belongs_to :donor

    validates_presence_of :finance_flow
  end
end
