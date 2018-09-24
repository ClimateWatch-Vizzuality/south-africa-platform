require 'rails_helper'
RSpec.describe Mitigation::FlagshipComponent, type: :model do
  it 'should be invalid when name is not present' do
    expect(
      FactoryBot.build(:flagship_component, name: '')
    ).to have(1).error_on(:name)
  end
  it 'should be invalid when programme is not present' do
    expect(
      FactoryBot.build(:flagship_component)
    ).to have(1).error_on(:flagship_programme)
  end

  let(:sector) {
    FactoryBot.build(:mitigation_sector)
  }
  let(:theme) {
    FactoryBot.build(:mitigation_theme, mitigation_sector: sector)
  }
  let(:programme) {
    FactoryBot.build(:flagship_programme, mitigation_theme: theme)
  }
  it 'should be valid' do
    expect(FactoryBot.build(:flagship_component, flagship_programme: programme)).to be_valid
  end
end
