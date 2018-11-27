FactoryBot.define do
  factory :nc_indicator, class: 'NationalCircumstance::Indicator' do
    sequence(:code) { |n| "CODE #{n}" }
    sequence(:indicator) { |n| "INDICATOR #{n}" }
    sequence(:category) { |n| "CATEGORY #{n}" }
    sequence(:unit) { |n| "UNIT #{n}" }
    sequence(:definition) { |n| "DEFINITION #{n}" }
  end
end
