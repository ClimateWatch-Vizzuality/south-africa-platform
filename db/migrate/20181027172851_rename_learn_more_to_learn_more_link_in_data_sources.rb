class RenameLearnMoreToLearnMoreLinkInDataSources < ActiveRecord::Migration[5.2]
  def change
    rename_column :data_sources, :learn_more, :learn_more_link
  end
end
