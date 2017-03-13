/* global $, Stripe */

//wait for document ready.
$(document).on('turbolinks:load', function() {
    var theForm = $('#pro_form');
    var submitBtn = $('#form-submit-btn');
    
    //set stripe public key
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content'));

    //when user clicks form submit btn
    submitBtn.click(function(event) {
        //prevent default submission behavior
        event.preventDefault();
        submitBtn.val("Processing").prop('disabled', true);

        //collect the credit card fields
        var ccNum = $('#card_number').val(),
             cvcNum = $('#card_code').val(), 
             expMonth = $('#card_month').val(),
             expYear = $('#card_year').val();
        
        //use stripe JS to check for card errors
        var error = false;
        if (!Stripe.card.validateCardNumber(ccNum)) {
            error = true;
            alert('The credit card number appears to be invalid.');
        }
        if (!Stripe.card.validateCVC(cvcNum)) {
            error = true;
            alert('The CVC number appears to be invalid.');
        }
        if (!Stripe.card.validateExpiry(expMonth, expYear)) {
            error = true;
            alert('The expiration date appears to be invalid');
        }
        if (error) {
            submitBtn.prop('disabled', false).val("Sign Up");
        }
        else {
            //send the card info to stripe
            Stripe.createToken({
               number: ccNum, 
               cvc: cvcNum, 
               exp_month: expMonth,
               exp_year: expYear
            }, stripeResponseHandler);
        }
       return false; 
    });
    
    function stripeResponseHandler(status, response) {
        //stripe returns card token
        var token = response.id;
        
        //inject card token as hidden field into form
        theForm.append($ ('<input type="hidden" name="user[stripe_card_token]">').val(token));
        
        //submit form to rails app
        theForm.get(0).submit();
    }
}
