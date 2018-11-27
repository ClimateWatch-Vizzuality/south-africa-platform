class CreateInventoryImprovementProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :inventory_improvement_projects do |t|
      t.text :name, null: false
      t.text :sector
      t.text :objective
      t.text :partner
      t.text :donor
      t.text :outcome
      t.text :status, null: false
      t.text :timelines
    end
  end
end
