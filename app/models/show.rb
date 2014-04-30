class Show < ActiveRecord::Base
	belongs_to :user
	validates :data, presence: true
end
