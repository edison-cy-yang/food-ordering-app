$(document).ready(function() {
  $('.customer-login button').on('click', function(event) {
    event.preventDefault();
    const email = $('input.email').val();
    const password = $('input.password').val();
    if (!email || !password) {
      //set error message
      $('.missing-fields-error-message').css('visibility', 'visible');
    } else {
      $('form.customer-login').submit();
    }
  });
});
