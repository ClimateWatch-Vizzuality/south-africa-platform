class CreateMitigationThemes < ActiveRecord::Migration[5.1]
  def change
    create_table :mitigation_themes do |t|
      t.string :title, optional: false
      t.integer :position, optional: false
      t.integer :mitigation_sector_id, optional: false

      t.timestamps

      t.foreign_key :mitigation_sectors
    end
  end
end
