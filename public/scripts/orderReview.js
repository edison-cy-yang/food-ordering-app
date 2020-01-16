$(document).ready(function() {
  const myOrder = JSON.parse(order);

  $(".place-order").on("click", function(event) {
    // event.preventDefault();
    $.ajax({
      url: "/orders",
      method: "POST",
      data: myOrder,
      success: function(data){
        console.log(data);
        $('.checkoutForm').submit();
      },
      failure: function(errMsg) {
        alert(errMsg);
      }
    });
  });

});
