class ShotsController < ApplicationController

	def show
		begin
			@shot = Show.find(params[:id])
			@shot.person_number+=1
			@shot.save
		rescue ActiveRecord::RecordNotFound  
			redirect_to root_path
			return
		end
	end
end
