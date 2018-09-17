# == Schema Information
#
# Table name: mitigation_effects
#
#  id          :bigint(8)        not null, primary key
#  theme       :string
#  name        :string
#  coordinator :string
#  effects_1   :string
#  effects_2   :string
#  effects_3   :string
#  effects_4   :string
#  effects_5   :string
#  effects_6   :string
#  effects_7   :string
#  effects_8   :string
#  effects_9   :string
#  effects_10  :string
#  effects_11  :string
#  effects_12  :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'
RSpec.describe Mitigation::MitigationEffect, type: :model do
  it 'should be invalid when theme not present' do
    expect(
      FactoryBot.build(:mitigation_effect, theme: '')
    ).to have(1).error_on(:theme)
  end
  it 'should be invalid when name not present' do
    expect(
      FactoryBot.build(:mitigation_effect, name: '')
    ).to have(1).error_on(:name)
  end
  it 'should be valid' do
    expect(FactoryBot.build(:mitigation_effect)).to be_valid
  end
end
