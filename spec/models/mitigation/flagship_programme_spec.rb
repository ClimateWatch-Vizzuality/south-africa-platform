require 'rails_helper'
RSpec.describe Mitigation::FlagshipProgramme, type: :model do
  it 'should be invalid when title is not present' do
    expect(
      FactoryBot.build(:flagship_programme, title: '')
    ).to have(1).error_on(:title)
  end
  it 'should be invalid when position is not present' do
    expect(
      FactoryBot.build(:flagship_programme, position: '')
    ).to have(1).error_on(:position)
  end
  it 'should be invalid when theme is not present' do
    expect(
      FactoryBot.build(:flagship_programme)
    ).to have(1).error_on(:mitigation_theme)
  end

  let(:sector) {
    FactoryBot.build(:mitigation_sector)
  }
  let(:theme) {
    FactoryBot.build(:mitigation_theme, mitigation_sector: sector)
  }
  it 'should be valid' do
    expect(FactoryBot.build(:flagship_programme, mitigation_theme: theme)).to be_valid
  end
end
