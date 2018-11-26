# == Schema Information
#
# Table name: mitigation_sectors
#
#  id          :bigint(8)        not null, primary key
#  name        :string
#  description :text
#  position    :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'
RSpec.describe Mitigation::MitigationSector, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryBot.build(:mitigation_sector, name: nil)
    ).to have(1).error_on(:name)
  end
  it 'should be valid' do
    expect(FactoryBot.build(:mitigation_sector)).to be_valid
  end
end
