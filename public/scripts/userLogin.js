$(document).ready(function() {
  $('.customer-login').on('submit', function(event) {
    event.preventDefault();
    const email = $('input.email').val();
    const password = $('input.password').val();
    if (!email || !password) {
      //set error message
      $('.missing-fields-error-message').css('visibility', 'visible');
    }
    const data = $(this).serialize();
    console.log(data);
    $.ajax({
      method: 'POST',
      url: '/customers/login'
    })
    .then(json => {
      console.log(json);
    });
  });
});
