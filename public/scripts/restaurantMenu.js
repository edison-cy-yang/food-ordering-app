$(document).ready(function() {
  const restaurantMenu = JSON.parse(menu);
  // $(".open-cart").hide();
  $(".cart-section").hide();


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


  let order = []
  let total = 0
  let toggle = false;

  //everytime you update, you call this function to change the icon
  //but it depends on toggle and #orders i have
  //if the toggle
  function updateCartIcon() {
    $(".cart-icon").empty();
    if (toggle && order.length) {
      $(".cart-icon").html("close");
    } else {
      $(".cart-icon").html("shopping_cart");
    }
  }

  //Showing the cart-button
  $(".quant-button").on("click", function(event) {
    $(".cart").empty();
    order = [];
    total = 0;
    for (let food of restaurantMenu) {
      if(Number($(`.${food.id}`).val())) {
        const quantity = Number($(`.${food.id}`).val());
        order.push({
          id: food.id,
          name: `${food.name}`,
          quantity: quantity,
          price: food.price,
          estimated_time: food.estimated_time
        });
        total += (food.price/100)*quantity
      };
    };
    if (!order.length) {
      $(".open-cart").removeClass("cart-slideup");
      $(".open-cart").addClass("cart-slidedown");
      $(".cart-section").hide();
      toggle = !toggle;
      $(".cart-icon").html("close");
    } else {
      $(".open-cart").removeClass("cart-slidedown");
      $(".open-cart").addClass("cart-slideup");
      $(".cart-icon").html("shopping_cart");
    }
      for (let key of order) {
        $(".cart").append(`<p class = "item-in-cart"> ${key.name} <span class="numberCircle"> ${key.quantity}</span></p>`);
      };
      $(".cart").append(`<p class = "total-in-cart"><strong>Total Amount: $${total}</strong></p>`);
      toggle = toggle && order.length > 0;
      updateCartIcon();
  });

  //Showing the cart;
  $(".open-cart").on("click", function(event) {
    event.preventDefault();
    toggle = !toggle;

    updateCartIcon();
    $(".cart-section").slideToggle();

  });

  function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hour(s) and " + rminutes + " minute(s).";
    }


  // Sending the order to database;
  $(".checkout").on("click", function(event) {
    // event.preventDefault();
    const myOrder = {};

    let total_mins = 0;

    for (let food of order) {
      total_mins += Number(food.estimated_time)*Number(food.quantity);
    }

    const est_time = timeConvert(total_mins);

    myOrder['food_items'] = order;
    myOrder['est_time'] = est_time;
    myOrder['total'] = total;
    myOrder['restaurant_id'] = restaurantMenu[0].restaurant_id;
    $.ajax({
      url: "/order_review",
      method: "POST",
      data: myOrder,
      success: function(data){console.log(data)},
      failure: function(errMsg) {
        alert(errMsg);
      }
    });
  });

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
