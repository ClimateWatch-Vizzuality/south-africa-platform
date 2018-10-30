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

class DataSource < ApplicationRecord
  include ::GenericToCsv

  validates :short_title, presence: true, uniqueness: true
end
