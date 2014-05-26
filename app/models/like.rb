class Like < ActiveRecord::Base
	belongs_to :user
	belongs_to :show
  validates :show_id, uniqueness: { scope: :user_id,
    message: "shouldn't like specific show twice" }
end
