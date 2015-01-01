class AddCommentsCountToShow < ActiveRecord::Migration
  def self.up
    add_column :shows, :comments_count, :integer, :default => 0

    Show.find_each do |show|
      Show.update_counters(show.id, comments_count: show.comments.count)
    end
  end

  def self.down
    remove_column :shows, :comments_count
  end
end
