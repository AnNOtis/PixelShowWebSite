class CommentsController < ApplicationController
	def create
		@comment = Comment.new(comment_params)
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
      params.require(:comment).permit(:show_id,:content)
    end
end
