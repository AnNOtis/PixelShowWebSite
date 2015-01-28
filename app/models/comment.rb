class Comment < ActiveRecord::Base
  include ActionView::Helpers::DateHelper
	belongs_to :user
	belongs_to :show, :counter_cache => true
	validates :content, presence: true
  default_scope order('created_at ASC')

  def formatted_created_time
    created_at.strftime("%Y/%m/%d %H:%M")
  end

  def time_ago
    time_ago_in_words(created_at)
  end
end
