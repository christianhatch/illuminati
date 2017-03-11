class ContactsController < ApplicationController 
    
   # GET request to /contact-us
   # Show new contact form
   def new
       @contact = Contact.new
   end
   
   # POST request to /contacts
   def create
       # Mass assignment of form fields into Contact object
        @contact = Contact.new(contact_params)
        # Save contact object to database
        if @contact.save
            # Grab form fields into variables
            name = params[:contact][:name]
            email = params[:contact][:email]
            body = params[:contact][:comments]
            # Create contact mailer and send email with the above variables
            ContactMailer.contact_email(name, email, body).deliver
            # Show success flash and redirect back to the 'new' action
            flash[:success] = "Message sent."
            redirect_to new_contact_path
        else 
            flash[:danger] = @contact.errors.full_messages.join(", ")
            redirect_to new_contact_path
        end
   end
   
   private 
   def contact_params
       # Whitelist form fields to collect data from form securely
       params.require(:contact).permit(:name, :email, :comments)
   end
   
end