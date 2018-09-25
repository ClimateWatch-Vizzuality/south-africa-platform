# == Schema Information
#
# Table name: projected_emission_years
#
#  id                    :bigint(8)        not null, primary key
#  year                  :integer
#  value                 :integer
#  projected_emission_id :bigint(8)
#

FactoryBot.define do
  factory :projected_emission_year, class: 'Ghg::ProjectedEmissionYear' do
    sequence(:year) { |n| n + 2000 }
    sequence(:value) { |n| n * 100 + 1000 }
  end
end
