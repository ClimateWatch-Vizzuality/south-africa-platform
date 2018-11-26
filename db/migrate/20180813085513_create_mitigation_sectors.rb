class CreateMitigationSectors < ActiveRecord::Migration[5.1]
  def change
    create_table :mitigation_sectors do |t|
      t.string :name, optional: false
      t.text :description
      t.integer :position

      t.timestamps
    end
  end
end
