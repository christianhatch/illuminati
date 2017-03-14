class ProfilesController < ApplicationController 
   
   # GET to users/:user_id/profile/new
   def new 
      @profile = Profile.new
   end
   
   # POST to users/:user_id/profile
  def create
    # find the user filling out the form
    @user = User.find(params[:user_id])
    
    @profile = @user.build_profile(profile_params)
    if @profile.save 
      flash[:success] = "Profile Updated!"
      redirect_to user_path(params[:user_id])
    else
      flash[:danger] = @profile.errors.full_messages.join(", ")
      render action: :new
    end
  end
  
  private 
   def profile_params 
    params.require(:profile).permit(:first_name, :last_name, :avatar, :job_title, :phone_number, :contact_email, :description)
   end
   
end