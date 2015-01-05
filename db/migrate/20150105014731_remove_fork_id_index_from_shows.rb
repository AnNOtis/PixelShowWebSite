class RemoveForkIdIndexFromShows < ActiveRecord::Migration
  def change
    remove_index :shows, [:user_id, :fork_id]
    add_index :shows, :fork_id
  end
end
