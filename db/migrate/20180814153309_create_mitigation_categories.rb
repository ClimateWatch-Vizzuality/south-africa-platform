class CreateMitigationCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :mitigation_categories do |t|
      t.string :title, optional: false
      t.integer :position, optional: false

      t.timestamps
    end
  end
end
