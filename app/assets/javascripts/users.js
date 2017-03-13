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
        
        //collect the credit card fields
        var ccNum = $('#card_number').val(),
             cvcNum = $('#card_code').val(), 
             expMonth = $('#card_month').val(),
             expYear = $('#card_year').val();
        
        Stripe.createToken({
           number: ccNum, 
           cvc: cvcNum, 
           exp_month: expMonth,
           exp_year: expYear
        }, stripeResponseHandler);
       
    });
    
    //send the card info to stripe
    //stripe returns card token
    //inject card token as hidden field into form
    //submit form to rails app
}
