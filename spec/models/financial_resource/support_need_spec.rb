require 'rails_helper'

RSpec.describe FinancialResource::SupportNeed, type: :model do
  it 'should be invalid when category not present' do
    expect(
      FactoryBot.build(:support_need, category: '')
    ).to have(1).error_on(:category)
  end
  it 'should be invalid when focus_area not present' do
    expect(
      FactoryBot.build(:support_need, focus_area: '')
    ).to have(1).error_on(:focus_area)
  end
  it 'should be valid' do
    expect(FactoryBot.build(:support_need)).to be_valid
  end
end
