class Me::ForksController < ApplicationController
  before_action :require_login
  def create
    # if this forked show is fork from other,
    # we should refer to it's origin but keep data.
    forked_show = Show.find(params[:id])
    forked_show_data = forked_show.data
    if forked_show.fork?
      forked_show = forked_show.fork
    end
    show = current_user.shows.build(
      fork_id: forked_show.id,
      name: "#{forked_show.name}-#{forked_show.forks_count+1}",
      data: forked_show_data
    )
    if show.save
      forked_show.update_forks_count
      redirect_to edit_me_show_path(show)
    else
      redirect_to :back, notice: "fork失敗！#{show.errors[:fork_id].first}"
    end
  end
end