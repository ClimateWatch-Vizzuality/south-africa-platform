FactoryBot.define do
  factory :projected_emission_boundary, class: 'Ghg::ProjectedEmissionBoundary' do
    iso { 'ZAF' }
    sequence(:name) { |n| ('A'..'Z').to_a[n] }
    boundary { 'UP' }
  end
end
