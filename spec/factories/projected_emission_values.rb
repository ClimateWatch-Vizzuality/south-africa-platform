FactoryBot.define do
  factory :projected_emission_value, class: 'Ghg::ProjectedEmissionValue' do
    iso { 'ZAF' }
    sequence(:name) { |n| ('A'..'Z').to_a[n] }
  end
end
