class CreateGhgProjectedEmissions < ActiveRecord::Migration[5.2]
  def change
    create_table :projected_emissions do |t|
      t.string :iso
      t.string :name, optional: false
      t.string :type, optional: false
      t.string :boundary

      t.timestamps
    end
  end
end
