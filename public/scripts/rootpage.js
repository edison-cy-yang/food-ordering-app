$(document).ready(function() {

  $(".show1").removeClass("invisible");
  setTimeout(() => {
    $(".show2").removeClass("invisible");
  },500);
  setTimeout(() => {
    $(".show3").removeClass("invisible");
  },1000);
  setTimeout(() => {
    $(".show4").removeClass("invisible");
  },1500);
  setTimeout(() => {
    $(".show5").removeClass("invisible");
  },2500);

  $(".logout").on("click", function(event) {
    $.ajax({
      url: "/customers/logout",
      method: "POST",
      success: function(data){location.reload();},
      failure: function(errMsg) {
        alert(errMsg);
      }
    });
   });
});
