# == Schema Information
#
# Table name: mitigation_themes
#
#  id                   :bigint(8)        not null, primary key
#  title                :string
#  position             :integer
#  mitigation_sector_id :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

require 'rails_helper'
RSpec.describe Mitigation::MitigationTheme, type: :model do
  it 'should be invalid when sector not present' do
    expect(
      FactoryBot.build(:mitigation_theme)
    ).to have(1).error_on(:mitigation_sector)
  end
  let(:sector) {
    FactoryBot.create(:mitigation_sector)
  }
  it 'should be valid' do
    expect(FactoryBot.build(:mitigation_theme, mitigation_sector: sector)).to be_valid
  end
end
