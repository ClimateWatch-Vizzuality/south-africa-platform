# == Schema Information
#
# Table name: data_sources
#
#  id                  :bigint(8)        not null, primary key
#  short_title         :string
#  title               :string
#  source_organization :string
#  learn_more_link     :string
#  citation            :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

require 'rails_helper'

RSpec.describe DataSource, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
