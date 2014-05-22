class Comment < ActiveRecord::Base
	belongs_to :user
	belongs_to :show
	validates :content, presence: true
end
