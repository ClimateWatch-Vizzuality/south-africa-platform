FactoryBot.define do
  factory :nc_indicator, class: 'NationalCircumstance::Indicator' do
    sequence(:code) { |n| ('A'..'Z').to_a[n] }
    sequence(:indicator) { |n| ('A'..'Z').to_a[n] }
    sequence(:category) { |n| ('A'..'Z').to_a[n] }
    sequence(:unit) { |n| ('A'..'Z').to_a[n] }
    sequence(:definition) { |n| ('A'..'Z').to_a[n] }
  end
end
