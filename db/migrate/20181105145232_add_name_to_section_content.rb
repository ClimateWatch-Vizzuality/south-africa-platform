class AddNameToSectionContent < ActiveRecord::Migration[5.2]
  def change
    add_column :section_contents, :name, :string
  end
end
