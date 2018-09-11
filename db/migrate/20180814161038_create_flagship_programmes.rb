class CreateFlagshipProgrammes < ActiveRecord::Migration[5.1]
  def change
    create_table :flagship_programmes do |t|
      t.integer :mitigation_theme_id
      t.string :title
      t.text :example
      t.text :description
      t.integer :position

      t.timestamps

      t.foreign_key :mitigation_themes
    end
  end
end
