class AddUserIdToShows < ActiveRecord::Migration
  def change
  	add_column :shows, :user_id, :string
  end
end
