class RemoveLikeNumberFromShow < ActiveRecord::Migration
  def change
    remove_column :shows, :like_number
  end
end
