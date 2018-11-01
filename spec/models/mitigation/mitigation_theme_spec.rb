require 'rails_helper'

RSpec.describe Mitigation::MitigationTheme, type: :model do
  it 'should be invalid when sector not present' do
    expect(
      FactoryBot.build(:mitigation_theme)
    ).to have(1).error_on(:mitigation_sector)
  end
  let(:sector) {
    FactoryBot.build(:mitigation_sector)
  }
  it 'should be valid' do
    expect(FactoryBot.build(:mitigation_theme, mitigation_sector: sector)).to be_valid
  end
end
