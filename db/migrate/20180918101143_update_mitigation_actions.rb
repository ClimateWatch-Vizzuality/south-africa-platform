class UpdateMitigationActions < ActiveRecord::Migration[5.2]
  def change
    rename_column :mitigation_actions, :bur1, :quantified_effect
  end
end
