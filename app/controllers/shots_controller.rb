class ShotsController < ApplicationController
	def index
		@shots = Show.all.sample(8)
	end
	def show
		
			@shot = Show.find(params[:id])
			@is_like = @shot.likes.find_by(user_id:current_user.id).nil? ? false : true
			@comments = @shot.comments.order(created_at: :desc).all
			@shot.person_number+=1
			@shot.save
	end
end
