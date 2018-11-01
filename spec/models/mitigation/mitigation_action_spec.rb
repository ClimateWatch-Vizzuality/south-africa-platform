require 'rails_helper'

RSpec.describe Mitigation::MitigationAction, type: :model do
  it 'should be invalid when theme not present' do
    expect(
      FactoryBot.build(:mitigation_action)
    ).to have(1).error_on(:mitigation_theme)
  end
  let(:sector) {
    FactoryBot.build(:mitigation_sector)
  }
  let(:theme) {
    FactoryBot.build(:mitigation_theme, mitigation_sector: sector)
  }
  it 'should be valid' do
    expect(FactoryBot.build(:mitigation_action, mitigation_theme: theme)).to be_valid
  end
end
