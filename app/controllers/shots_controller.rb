class ShotsController < ApplicationController
	def index
		binding.pry
		timeframe = params[:timeframe]
		@shots = Show.all.sample(8)
	end
	def show
		@shot = Show.find(params[:id])
		if signed_in?
			@is_like = @shot.likes.find_by(user_id:current_user.id).nil? ? false : true
		end
		@comments = @shot.comments.order(created_at: :desc).all
		@shot.person_number+=1
		@shot.save
	end
end
