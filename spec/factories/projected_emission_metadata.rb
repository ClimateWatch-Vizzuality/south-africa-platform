# == Schema Information
#
# Table name: projected_emission_metadata
#
#  id         :bigint(8)        not null, primary key
#  code       :string           not null
#  indicator  :string           not null
#  unit       :string
#  definition :text
#  program    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryBot.define do
  factory :projected_emission_metadata, class: 'Ghg::ProjectedEmissionMetadata' do
    sequence(:code) { |n| ('A'..'Z').to_a[n] }
    sequence(:indicator) { |n| ('A'..'Z').to_a[n] }
    sequence(:unit) { |n| ('A'..'Z').to_a[n] }
    sequence(:definition) { |n| ('A'..'Z').to_a[n] }
    sequence(:program) { |n| ('A'..'Z').to_a[n] }
  end
end
