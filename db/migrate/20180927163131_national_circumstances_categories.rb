class NationalCircumstancesCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :nc_categories do |t|
      t.integer :category_group_id, null: false
      t.integer :location_id, null: false

      t.foreign_key :nc_category_groups, column: :category_group_id
      t.foreign_key :locations
      t.timestamps
    end
  end
end
