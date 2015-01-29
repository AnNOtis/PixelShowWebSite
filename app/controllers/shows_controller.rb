class ShowsController < ApplicationController
	TIMEFRAME = ['day','week','month']
	def index
		if params[:timeframe].in?(TIMEFRAME)
			@shows = Show.all.between(DateTime.now, 1.send(params[:timeframe]).ago)
			@timeframe = params[:timeframe]
		else
			@shows = Show.all
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

end
