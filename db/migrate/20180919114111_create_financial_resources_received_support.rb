class CreateFinancialResourcesReceivedSupport < ActiveRecord::Migration[5.2]
  def change
    create_table :received_supports do |t|
      t.integer :donor_id, optional: false
      t.string :finance_flow, optional: false
      t.string :type_funds
      t.integer :amount_zar
      t.integer :amount_usd
      t.string :timeframes
      t.boolean :focus_area_1, default: false
      t.boolean :focus_area_2, default: false
      t.boolean :focus_area_3, default: false
      t.boolean :focus_area_4, default: false
      t.boolean :focus_area_5, default: false
      t.boolean :focus_area_6, default: false
      t.boolean :focus_area_7, default: false
      t.boolean :focus_area_8, default: false
      t.integer :cofinancing
      t.text :purpose_funds
      t.text :program_funds
      t.text :outcome_funds

      t.timestamps

      t.foreign_key :donors
      t.index :finance_flow
      t.index :type_funds
    end
  end
end
