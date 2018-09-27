class CreateNationalCircumstancesIndicators < ActiveRecord::Migration[5.2]
  def change
    create_table :national_circumstance_indicators do |t|
      t.string :code
      t.string :indicator
      t.string :category
      t.string :unit
      t.text :definition

      t.timestamps
    end
  end
end
