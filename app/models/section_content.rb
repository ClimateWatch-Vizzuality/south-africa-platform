class SectionContent < ApplicationRecord
  belongs_to :parent_section, class_name: 'SectionContent', foreign_key: 'parent_section_id', optional: true
  has_many :subsections, class_name: 'SectionContent', foreign_key: 'subsection_id'

  accepts_nested_attributes_for :subsections, allow_destroy: false
end
