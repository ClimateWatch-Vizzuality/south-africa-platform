# == Schema Information
#
# Table name: nc_categories
#
#  id                :bigint(8)        not null, primary key
#  category_group_id :integer          not null
#  location_id       :integer          not null
#  name              :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

require 'rails_helper'

RSpec.describe NationalCircumstance::Category, type: :model do
  it 'should be invalid when name is not present' do
    expect(
      FactoryBot.build(:nc_category, name: '')
    ).to have(1).error_on(:name)
  end
  it 'should be invalid when location is not present' do
    expect(
      FactoryBot.build(:nc_category)
    ).to have(1).error_on(:location)
  end
  it 'should be invalid when category group is not present' do
    expect(
      FactoryBot.build(:nc_category)
    ).to have(1).error_on(:category_group)
  end

  it 'should be valid' do
    expect(FactoryBot.build(:nc_category_complete)).to be_valid
  end
end
