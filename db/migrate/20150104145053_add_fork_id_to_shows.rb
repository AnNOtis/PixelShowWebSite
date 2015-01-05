class AddForkIdToShows < ActiveRecord::Migration
  def change
    add_column :shows, :fork_id, :integer
    add_index :shows, [:user_id, :fork_id], unique: true
  end
end
