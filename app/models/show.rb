class Show < ActiveRecord::Base
	belongs_to :user
	validates :name, presence: true

	before_save :init_data
	private
	def init_data
		if self.data.nil?
	      self.data = ('_'+'#fff'*10)*10
	    end
	end
end
