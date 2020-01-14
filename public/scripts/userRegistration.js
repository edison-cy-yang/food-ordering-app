$(document).ready(function() {
  $('#registration-form').on('submit', function(event) {
    event.preventDefault();
    $('.password-match-error-message').css('visibility', 'hidden');
    $('.missing-fields-error-message').css('visibility', 'hidden');
    const email = $('input.email').val();
    const password = $('input.password').val();
    const re_enter_password = $('input.re-enter-password').val();
    if (password !== re_enter_password) {
      console.log("password not match");
      $('.password-match-error-message').css('visibility', 'visible');
      return;
    }
    const name = $('input.user-name').val();
    const phone = $('input.phone').val();
    if (!email || !password || !re_enter_password || !name || !phone) {
      console.log("missing fields");
      $('.missing-fields-error-message').css('visibility', 'visible');
      return;
    }
    const data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/users",
      data
    })
    .then(json => {
      console.log(json);
    });
  });
});
