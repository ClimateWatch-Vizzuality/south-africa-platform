class CreateNationalCircumstancesCategoryYears < ActiveRecord::Migration[5.2]
  def change
    create_table :nc_category_years do |t|
      t.integer :year, null: false
      t.integer :category_id, null: false
      t.float :value

      t.timestamps

      t.foreign_key :nc_categories, column: :category_id
    end
  end
end
