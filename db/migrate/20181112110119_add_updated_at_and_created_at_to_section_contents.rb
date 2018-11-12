class AddUpdatedAtAndCreatedAtToSectionContents < ActiveRecord::Migration[5.2]
  def change
    add_column :section_contents, :updated_at, :datetime
    add_column :section_contents, :created_at, :datetime
  end
end
