class CreateFinancialResourcesSupportNeeds < ActiveRecord::Migration[5.2]
  def change
    create_table :support_needs do |t|
      t.string :category, optional: false
      t.string :focus_area, optional: false
      t.string :reference
      t.string :support_type
      t.string :scheme

      t.timestamps
    end
  end
end
