class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.string :model
      t.integer :user_id
      t.integer :show_id

      t.timestamps
    end
  end
end
