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
