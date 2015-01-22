class ChangeUserTypeToShow < ActiveRecord::Migration
  def change
    change_column :shows, :user_id, 'integer USING CAST(user_id AS integer)'
  end
end
