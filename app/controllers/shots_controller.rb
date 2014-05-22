class ShotsController < ApplicationController
	def index
		
	end
	def show
		begin
			@shot = Show.find(params[:id])
			@comments = @shot.comments.all
			@shot.person_number+=1
			@shot.save
		rescue ActiveRecord::RecordNotFound  
			redirect_to root_path
			return
		end
	end
end
