class Show < ActiveRecord::Base
	belongs_to :user
	validates :name, presence: true
	default_scope { order("created_at DESC") } #按照創建時間排序
	before_save :init_data
	private
	def init_data
		if self.data.nil?
	      self.data = ('_'+'#fff'*10)*10
	    end
	end
end
