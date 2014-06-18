class AddCommentsCountToShow < ActiveRecord::Migration
  def self.up    
    add_column :shows, :comments_count, :integer, :default => 0
        
    Show.find_each do |show|
      show.update_attribute(:comments_count, show.comments.count)
    end
  end
  
  def self.down
    remove_column :shows, :comments_count
  end
end
