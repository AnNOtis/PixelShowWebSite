class AddForkCountToShow < ActiveRecord::Migration
  def change
    add_column :shows, :forks_count, :integer
  end
end
