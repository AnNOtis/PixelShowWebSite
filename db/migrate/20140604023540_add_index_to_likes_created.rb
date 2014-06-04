class AddIndexToLikesCreated < ActiveRecord::Migration
  def change
    add_index :likes, :created_at
  end
end
