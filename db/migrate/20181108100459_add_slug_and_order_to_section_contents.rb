class AddSlugAndOrderToSectionContents < ActiveRecord::Migration[5.2]
  def change
    add_column :section_contents, :slug, :string
    add_column :section_contents, :order, :integer
  end
end
