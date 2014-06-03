class Like < ActiveRecord::Base
	belongs_to :user
	belongs_to :show
  validates :show_id, uniqueness: { scope: :user_id,
    message: "shouldn't like specific show twice" }
  scope :popular, ->(time) { where("created_at > ?", time).select("show_id, count(show_id) as count").group(:show_id).order("count desc").limit(6) }
end
