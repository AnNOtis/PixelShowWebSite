class Show < ActiveRecord::Base
	belongs_to :user
	validates :name, presence: true
	default_scope { order("created_at DESC") } #按照創建時間排序
	before_save :init_data
	private
	def init_data
		if self.data.nil?
	      self.data = ('_'+'#ffffff'*10)*10
	    end
	    if self.person_number.nil?
	    	self.person_number = 0
	    end
	end
end
