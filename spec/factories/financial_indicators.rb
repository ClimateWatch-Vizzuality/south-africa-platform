# == Schema Information
#
# Table name: financial_indicators
#
#  id             :bigint(8)        not null, primary key
#  code           :string
#  indicator      :string
#  category       :string
#  indicator_type :string
#  unit           :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

FactoryBot.define do
  factory :financial_indicator, class: 'FinancialResource::Indicator' do
    sequence(:code) { |n| ('A'..'Z').to_a[n] }
    sequence(:indicator) { |n| ('A'..'Z').to_a[n] }
    sequence(:indicator_type) { |n| ('A'..'Z').to_a[n] }
    sequence(:unit) { |n| ('A'..'Z').to_a[n] }
  end
end
