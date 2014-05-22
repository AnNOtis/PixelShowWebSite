class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :user_id
      t.integer :show_id
      t.string :content

      t.timestamps
    end
  end
end
