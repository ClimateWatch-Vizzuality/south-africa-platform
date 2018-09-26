# == Schema Information
#
# Table name: flagship_programmes
#
#  id                :bigint(8)        not null, primary key
#  sub_programs      :text
#  description       :text
#  position          :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  work_package      :text
#  outcomes          :text
#  flagship_theme_id :integer
#

require 'rails_helper'
RSpec.describe Mitigation::FlagshipProgramme, type: :model do
  it 'should be invalid when position is not present' do
    expect(
      FactoryBot.build(:flagship_programme, position: '')
    ).to have(1).error_on(:position)
  end
  it 'should be invalid when flagship is not present' do
    expect(
      FactoryBot.build(:flagship_programme)
    ).to have(1).error_on(:flagship_theme)
  end

  let(:theme) {
    FactoryBot.build(:flagship_theme)
  }
  it 'should be valid' do
    expect(FactoryBot.build(:flagship_programme, flagship_theme: theme)).to be_valid
  end
end
