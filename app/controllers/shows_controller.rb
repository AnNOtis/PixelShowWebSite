class ShowsController < ApplicationController
	TIMEFRAME = ['day','week','month']
	def index
		if params[:timeframe].in?(TIMEFRAME)
			@shows = popular_show(params[:timeframe])
			@timeframe = params[:timeframe]
		else
			@shows = Show.all.shuffle
			@timeframe = 'all'
		end

	end

	def show
		@show = Show.find(params[:id])
		if signed_in?
			@is_like = @show.likes.find_by(user_id:current_user.id).nil? ? false : true
		end
		@comments = @show.comments.order(created_at: :desc).all
		@show.increment(:person_number)
		@show.save
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
