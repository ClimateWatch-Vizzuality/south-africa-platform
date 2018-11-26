class ChangeTypeOfLongNumbers < ActiveRecord::Migration[5.2]
  def change
    change_column :received_supports, :amount_zar, :bigint
    change_column :received_supports, :amount_usd, :bigint
  end
end
