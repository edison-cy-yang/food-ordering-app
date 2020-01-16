$(document).ready(function() {
  const myOrder = JSON.parse(order);

  $(".place-order").on("click", function(event) {
    // event.preventDefault();
    $.ajax({
      url: "/orders/new",
      method: "POST",
      data: myOrder,
      success: function(data){console.log(data)},
      failure: function(errMsg) {
        alert(errMsg);
      }
    });
  });

});
