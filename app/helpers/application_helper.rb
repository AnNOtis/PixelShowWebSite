module ApplicationHelper
  def body_class
    "#{controller_name} #{action_name}"
  end

  def owner?(user)
    current_user && (current_user.id == user.id)
  end
end
