class CommentsController < ApplicationController
	def create		
		@comment = Show.find(params[:show_id]).comments.new(comment_params)
    	@comment.user_id = current_user.id
		respond_to	do |format|
			if @comment.save
				format.json {render json: @comment}
			else
				format.json {render json: @comment.errors}
			end
		end
	end
  private
    def comment_params
      params.permit(:show_id,:content)
    end
end
