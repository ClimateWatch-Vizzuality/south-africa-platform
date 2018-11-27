class AddSubsectionToSectionContent < ActiveRecord::Migration[5.2]
  def change
    add_column :section_contents, :subsection_id, :integer, null: true, index: true
    add_foreign_key :section_contents, :section_contents, column: :subsection_id
  end
end
