class CreateFinancialResourcesIndicators < ActiveRecord::Migration[5.2]
  def change
    create_table :financial_indicators do |t|
      t.string :code, optional: false
      t.string :indicator, optional: false
      t.string :category
      t.string :indicator_type
      t.string :unit

      t.timestamps
    end
  end
end
