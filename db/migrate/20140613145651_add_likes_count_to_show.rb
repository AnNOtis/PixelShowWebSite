class AddLikesCountToShow < ActiveRecord::Migration
  def self.up
    add_column :shows, :likes_count, :integer, :default => 0

    # 如果是網站上線後才新增這個功能，這裡需要先計算設定好初始值
    Show.find_each do |show|
      Show.update_counters(show.id, likes_count: show.likes.count)
    end
  end

  def self.down
    remove_column :shows, :likes_count
  end
end
