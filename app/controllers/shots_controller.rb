class ShotsController < ApplicationController

	def show
		@shot = Show.friendly.find(params[:id])
		@shot.person_number+=1
		@shot.save
	end
end
