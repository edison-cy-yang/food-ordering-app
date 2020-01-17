$(document).ready(function() {

  $(".show1").removeClass("invisible");
  setTimeout(() => {
    $(".show2").removeClass("invisible");
  },1100);


  $(".logout").on("click", function(event) {
    $.ajax({
      url: "/customers/logout",
      method: "POST",
      success: function(data){console.log(data)},
      failure: function(errMsg) {
        alert(errMsg);
      }
    });
    location.reload();
   });


});
