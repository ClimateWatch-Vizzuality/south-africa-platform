# == Schema Information
#
# Table name: mitigation_indicators
#
#  id         :bigint(8)        not null, primary key
#  code       :string
#  indicator  :string
#  unit       :string
#  cautions   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryBot.define do
  factory :mitigation_indicator, class: 'Mitigation::MitigationIndicator' do
    sequence(:code) { |n| ('A'..'Z').to_a[n] }
    sequence(:indicator) { |n| ('A'..'Z').to_a[n] }
    sequence(:unit) { |n| ('A'..'Z').to_a[n] }
    sequence(:cautions) { |n| ('A'..'Z').to_a[n] }
  end
end
