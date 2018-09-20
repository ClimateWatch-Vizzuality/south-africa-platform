# == Schema Information
#
# Table name: donors
#
#  id          :bigint(8)        not null, primary key
#  name        :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

FactoryBot.define do
  factory :donor, class: 'FinancialResource::Donor' do
    sequence(:name) { |n| ('A'..'Z').to_a[n] }
    sequence(:description) { |n| ('A'..'Z').to_a[n] }
  end
end
