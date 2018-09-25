# == Schema Information
#
# Table name: flagship_components
#
#  id                    :bigint(8)        not null, primary key
#  flagship_programme_id :integer
#  name                  :string           not null
#  main_activities       :text
#  lead                  :string
#  status                :string
#  milestone             :text
#  barriers              :text
#  next_steps            :text
#  timeframe             :string
#  support               :text
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#

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

  let(:theme) {
    FactoryBot.build(:flagship_theme)
  }
  let(:programme) {
    FactoryBot.build(:flagship_programme, flagship_theme: theme)
  }
  it 'should be valid' do
    expect(FactoryBot.build(:flagship_component, flagship_programme: programme)).to be_valid
  end
end
