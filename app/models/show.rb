class Show < ActiveRecord::Base
	extend FriendlyId
	# require 'babosa'
	friendly_id :name_and_creator, use: [:slugged, :finders]
	belongs_to :user
	has_many :comments
	has_many :likes , autosave:true

	validates :name, presence: true
  validates :name, uniqueness: {scope: :user_id, message: "名字已經被使用囉！"}, unless: :fork?
  # validates :fork_id, uniqueness: {scope: :user_id, message: "你已經fork過了！"}, if: :fork?
	validates :slug, presence: true

	default_scope { order("created_at DESC") } #按照創建時間排序
	before_save :init_data

	def normalize_friendly_id(input)
    #strip the string
    str = input.strip
    # str.gsub! /\s*[^A-Za-z0-9]\s*/, '-'
    str.gsub! /[^-\p{Alnum}]/, '-'
    str.gsub! /-+/, "-"
    str.downcase
  end

  def user_name
    user.name
  end

  def fork?
    !fork_id.nil?
  end

  def fork
    Show.find(fork_id)
  end

  def increment(attribute, by = 1)
    self[attribute] ||= 0
    self[attribute] += by
    self
  end

  def update_forks_count(by = 1)
    count = forks_count
    count ||= 0
    count += by
    self.update_attribute(:forks_count, count)
  end

  # trace origin show's forks_count
  def forks_number
    number = fork? ? fork.forks_count : forks_count
    number ||= 0
  end
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
