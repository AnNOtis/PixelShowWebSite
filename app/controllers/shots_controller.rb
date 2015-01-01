class ShotsController < ApplicationController
	TIMEFRAME = ['day','week','month']
	def index
		if params[:timeframe].in?(TIMEFRAME)
			@shots = popular_show(params[:timeframe])
			@timeframe = params[:timeframe]
		else
			@shots = Show.all.shuffle
			@timeframe = 'all'
		end

	end
	def show
		@shot = Show.find(params[:id])
		if signed_in?
			@is_like = @shot.likes.find_by(user_id:current_user.id).nil? ? false : true
		end
		@comments = @shot.comments.order(created_at: :desc).all
		@shot.person_number = @shot.person_number? ? @shot.person_number+1 : 0
		@shot.save
	end

	private
		def popular_show(timeframe)
			time = DateTime.now - 1.send(timeframe)
			Show.find_all_by_id(
				Like.popular(time).map do |like|
					like.show_id
				end
			)
		end
end
