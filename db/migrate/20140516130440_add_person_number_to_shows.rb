class AddPersonNumberToShows < ActiveRecord::Migration
  def change
    add_column :shows, :person_number, :integer
    add_column :shows, :like_number, :integer
  end
end
