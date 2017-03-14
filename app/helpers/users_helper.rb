module UsersHelper
    
   def job_title_icon
      if @user.profile.job_title == "Master"
          "<i class='fa fa-magnet'></i>".html_safe
      elsif @user.profile.job_title == "Apprentice"
          "<i class='fa fa-umbrella'></i>".html_safe
      elsif @user.profile.job_title == "Neophyte"
           "<i class='fa fa-snowflake-o'></i>".html_safe
      end
   end
    
end