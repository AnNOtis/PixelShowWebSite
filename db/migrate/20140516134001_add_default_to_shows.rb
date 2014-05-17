class AddDefaultToShows < ActiveRecord::Migration
  def change
  	change_column :shows, :person_number, :integer, default:0
  end
end
