require 'rails_helper'

RSpec.describe NationalCircumstance::CategoryYear, type: :model do
  it 'should be invalid when category is not present' do
    expect(
      FactoryBot.build(:nc_category_year, category: nil)
    ).to have(1).error_on(:category)
  end
  it 'should be invalid when value is not present' do
    expect(
      FactoryBot.build(:nc_category_year, value: nil)
    ).to have(1).error_on(:value)
  end

  it 'should be valid' do
    expect(FactoryBot.build(:nc_category_year_complete)).to be_valid
  end
end
