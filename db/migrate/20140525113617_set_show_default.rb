class SetShowDefault < ActiveRecord::Migration
  def change
    change_column :shows, :like_number, :integer, :default=> 0
  end
end
