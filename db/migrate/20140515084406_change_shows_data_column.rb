class ChangeShowsDataColumn < ActiveRecord::Migration
  def change
  	change_column :shows, :data, :text, :limit => nil
  end
end
