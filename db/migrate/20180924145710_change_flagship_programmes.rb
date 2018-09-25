class ChangeFlagshipProgrammes < ActiveRecord::Migration[5.2]
  def change
    create_table :flagship_themes do |t|
      t.string :name, null: false
      t.integer :position, null: false

      t.timestamps
    end

    remove_column :flagship_programmes, :mitigation_theme_id
    remove_column :flagship_programmes, :title
    rename_column :flagship_programmes, :example, :sub_programs
    add_column :flagship_programmes, :work_package, :text
    add_column :flagship_programmes, :outcomes, :text
    add_column :flagship_programmes, :flagship_theme_id, :integer
    add_foreign_key :flagship_programmes, :flagship_themes
  end
end
