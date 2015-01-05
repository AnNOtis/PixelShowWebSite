module ShowsHelper
  def forked_show_link(forked_show, options = {})
    # owner_link = link_to forked_show.user_name, user_path(forked_show.user)
    show_link = link_to "#{forked_show.user_name}/#{forked_show.name}", show_path(forked_show)
    content_tag :span, options do
      raw "forked from #{show_link}"
    end
  end
end
