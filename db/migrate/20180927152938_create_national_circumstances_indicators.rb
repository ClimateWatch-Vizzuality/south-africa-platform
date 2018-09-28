class CreateNationalCircumstancesIndicators < ActiveRecord::Migration[5.2]
  def change
    create_table :nc_indicators do |t|
      t.string :code, null: false
      t.string :indicator, null: false
      t.string :category
      t.string :unit
      t.text :definition

      t.timestamps
    end
  end
end
