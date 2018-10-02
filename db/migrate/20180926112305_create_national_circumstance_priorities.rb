class CreateNationalCircumstancePriorities < ActiveRecord::Migration[5.2]
  def change
    create_table :priorities do |t|
      t.integer :location_id, null: false
      t.string :code, null: false
      t.text :value, null: false

      t.timestamps

      t.foreign_key :locations
    end
  end
end
