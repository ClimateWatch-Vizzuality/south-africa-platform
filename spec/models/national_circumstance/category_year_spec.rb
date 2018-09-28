require 'rails_helper'

RSpec.describe NationalCircumstance::CategoryYear, type: :model do
  it 'should be invalid when category is not present' do
    expect(
      FactoryBot.build(:nc_category_year, category: nil)
    ).to have(1).error_on(:category)
  end
  it 'should be invalid when values are not present' do
    expect(
      FactoryBot.build(:nc_category_year, value_int: nil, value_float: nil)
    ).to have(1).error_on(:value_int)
  end
  it 'should be invalid when both values are present' do
    expect(
      FactoryBot.build(:nc_category_year, value_int: 1, value_float: 1)
    ).to have(1).error_on(:value_int)
  end

  it 'should be valid' do
    expect(FactoryBot.build(:nc_category_year_complete)).to be_valid
  end
end
