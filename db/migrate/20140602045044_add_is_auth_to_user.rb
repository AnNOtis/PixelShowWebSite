class AddIsAuthToUser < ActiveRecord::Migration
  def change
    add_column :users, :is_auth, :boolean
  end
end
