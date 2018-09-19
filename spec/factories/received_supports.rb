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
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

FactoryBot.define do
  factory :received_support, class: 'FinancialResource::ReceivedSupport' do
    sequence(:finance_flow) { |n| ('A'..'Z').to_a[n] }
    sequence(:type_funds) { |n| ('A'..'Z').to_a[n] }
    sequence(:amount_zar) { 1000 }
    sequence(:amount_usd) { 100 }
    sequence(:timeframes) { |n| ('A'..'Z').to_a[n] }
    sequence(:focus_area_1) { true }
    sequence(:focus_area_2) { true }
    sequence(:focus_area_3) { true }
    sequence(:focus_area_4) { true }
    sequence(:focus_area_5) { true }
    sequence(:focus_area_6) { true }
    sequence(:focus_area_7) { true }
    sequence(:focus_area_8) { true }
    sequence(:cofinancing) { 10 }
    sequence(:purpose_funds) { |n| ('A'..'Z').to_a[n] }
    sequence(:program_funds) { |n| ('A'..'Z').to_a[n] }
    sequence(:outcome_funds) { |n| ('A'..'Z').to_a[n] }

    factory :received_support_complete, class: 'FinancialResource::ReceivedSupport' do
      association :donor, factory: :donor, strategy: :build
    end
  end
end
