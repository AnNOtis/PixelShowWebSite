class Show < ActiveRecord::Base
	extend FriendlyId
	friendly_id :name_and_creator, use: [:slugged, :finders]
	belongs_to :user
	has_many :comments

	validates :name, presence: true
	validates :slug, presence: true
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

	def name_and_creator
		creator = User.find(self.user_id).name
		"#{self.name} by #{creator}"
	end

	#overwrite frendlyId changed method
	def should_generate_new_friendly_id?
	    name_changed?||self.slug.nil?
	end
end
