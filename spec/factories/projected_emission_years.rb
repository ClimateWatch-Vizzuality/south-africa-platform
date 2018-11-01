# == Schema Information
#
# Table name: projected_emission_years
#
#  id                    :bigint(8)        not null, primary key
#  value                 :integer
#  year                  :integer
#  projected_emission_id :bigint(8)
#
# Indexes
#
#  index_projected_emission_years_on_projected_emission_id  (projected_emission_id)
#
# Foreign Keys
#
#  fk_rails_...  (projected_emission_id => projected_emissions.id)
#

FactoryBot.define do
  factory :projected_emission_year, class: 'Ghg::ProjectedEmissionYear' do
    sequence(:year) { |n| n + 2000 }
    sequence(:value) { |n| n * 100 + 1000 }
  end
end
