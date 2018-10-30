class CreateProjectedEmissionMetadata < ActiveRecord::Migration[5.2]
  def change
    create_table :projected_emission_metadata do |t|
      t.string :code, null: false
      t.string :indicator, null: false
      t.string :unit
      t.text :definition
      t.string :program

      t.timestamps
    end
  end
end
