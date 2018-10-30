# == Schema Information
#
# Table name: data_sources
#
#  id                  :bigint(8)        not null, primary key
#  short_title         :string
#  title               :string
#  source_organization :string
#  learn_more_link     :string
#  citation            :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

FactoryBot.define do
  factory :data_source do
    short_title { 'MyString' }
    title { 'MyString' }
    source_organization { 'MyString' }
    learn_more_link { 'MyString' }
    citation { 'MyString' }
  end
end
