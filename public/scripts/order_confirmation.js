$(document).ready(function() {

  $(".show1").removeClass("invisible");
  setTimeout(() => {
    $(".show2").removeClass("invisible");
  },1100);


  $(".logout").on("click", function(event) {
    $.ajax({
      url: "/customers/logout",
      method: "POST",
      success: function(data){location.reload()},
      failure: function(errMsg) {
        alert(errMsg);
      }
    });
   });
});
