class ShotsController < ApplicationController

	def show
		@shot = Show.friendly.find(params[:id])
	end
end
