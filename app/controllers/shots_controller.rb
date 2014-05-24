class ShotsController < ApplicationController
	def index
		@shots = Show.all.sample(8)
	end
	def show
		begin
			@shot = Show.find(params[:id])
			@comments = @shot.comments.order(created_at: :desc).all
			@shot.person_number+=1
			@shot.save
		rescue ActiveRecord::RecordNotFound  
			redirect_to root_path
			return
		end
	end
end
