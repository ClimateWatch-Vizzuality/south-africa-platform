class CreateMitigationActions < ActiveRecord::Migration[5.1]
  def change
    create_table :mitigation_actions do |t|
      t.integer :mitigation_category_id, optional: false
      t.string :name, optional: false
      t.text :objectives
      t.string :status
      t.string :actor
      t.string :time_horizon
      t.string :ghg
      t.string :estimated_emission_reduction

      t.timestamps

      t.index :status
      t.index :actor
      t.index :ghg
      t.foreign_key :mitigation_categories
    end
  end
end
