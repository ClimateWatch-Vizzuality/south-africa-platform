# == Schema Information
#
# Table name: nc_category_groups
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe NationalCircumstance::CategoryGroup, type: :model do
  it 'should be invalid when name is not present' do
    expect(
      FactoryBot.build(:nc_category_group, name: '')
    ).to have(1).error_on(:name)
  end

  it 'should be valid' do
    expect(FactoryBot.build(:nc_category_group)).to be_valid
  end
end
