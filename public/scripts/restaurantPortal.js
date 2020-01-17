$(document).ready(function() {
  const allOrders = JSON.parse(orders);
  const incomingOrders = [];
  const acceptedOrders = [];
  const completedOrders = [];
  const pickedupOrders = [];

  for (let order of allOrders) {
    if (order.pickedup_at) {
      pickedupOrders.push(order);
    } else if (order.completed_at) {
      completedOrders.push(order);
    } else if (order.accepted_at) {
      acceptedOrders.push(order);
    } else {
      incomingOrders.push(order);
    }
  }

  console.log(incomingOrders);
  console.log(acceptedOrders);
  console.log(completedOrders);

  // console.log(allOrders);

  const waitTimeSelection = `
  <form method="POST" action="/" class="form-inline">
    <div class="wait-time-form">
      <label for="waitTime">Estimated wait time: </label>
      <select class="form-control" id="waitTime">
        <option selected="selected" value="0">15 Minutes</option>
        <option value="1">30 Minutes</option>
        <option value="2">45 Minutes</option>
        <option value="3">1 Hour</option>
        <option value="4">1 Hour 15 Minutes</option>
        <option value="5">1 Hour 30 Minutes</option>
        <option value="6">1 Hour 45 Minutes</option>
        <option value="7">2 Hours</option>
        <option value="8">2 Hours 15 Minutes</option>
        <option value="9">2 Hours 30 minutes</option>
        <option value="10">2 Hours 45 minutes</option>
        <option value="11">3 Hours</option>
      </select>`;

///////////////////Unused, for reference//////
  const accordionString = `
  <div class="accordion" id="accordionExample">
    <% for (const order of orders) { %>
      <div class="card">
        <div class="card-header" id="headingOne">
          <h2 class="mb-0">
            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Order number <%= order.order_id %> by <%= order.customer_name %>
            </button>
          </h2>
        </div>

        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
          <div class="card-body">
            <ul>
              <% for (const item of order.food_items) { %>
                <li><%= item.food_name %>: <%= item.quantity %></li>
              <% } %>
            </ul>
          </div>
        </div>
      </div>
    <% } %>
  </div>`;
////////////////////////////////////////////////
////////FOR INCOMING ORDERS
  let string = `<h2 id="incoming-orders-section">Incoming orders</h2><div class="accordion" id="incoming-orders-accordion">`;
  for (let i = 0; i < incomingOrders.length; i++) {
    string += `
    <div class="card incoming-card" id="${i}">
    <div class="card-header" id="heading${i}">
      <p class="mb-0">
        <button class="btn" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
          <p>
            Order number ${incomingOrders[i].order_id} by ${incomingOrders[i].customer_name} (${incomingOrders[i].phone})
          </p>
          <span class="estimated-time">Estimated preparation time: ${incomingOrders[i].estimated_time}</span>
        </button>
      </p>
    </div>

    <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#incoming-orders-accordion">
      <div class="order-body">
          <div class="card-body">
            <ul>
    `;
    const order = incomingOrders[i];
    for (let j = 0; j < order.food_items.length; j++) {
      string += `<li>${order.food_items[j].food_name}: ${order.food_items[j].quantity}</li>`;
    }
    string += `</ul></div>${waitTimeSelection}<button class="btn btn-primary accept" id="${i}">Accept</button></div></form></div></div></div>`;
  }

  $('#orders-container').html(string);

//////////////
//////FOR ACCEPTED ORDERS///////
  string = `<h2 id="accepted-orders-section">Accepted orders</h2><div class="accordion" id="accepted-orders-accordion">`;
  for (let i = 0; i < acceptedOrders.length; i++) {
    string += `
    <div class="card accepted-card" id="${i}">
    <div class="card-header" id="heading${i}">
      <p class="mb-0">
        <button class="btn" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
          <p>
            Order number ${acceptedOrders[i].order_id} by ${acceptedOrders[i].customer_name} (${acceptedOrders[i].phone})
          </p>
          <span class="estimated-time">Estimated preparation time: ${acceptedOrders[i].estimated_time}</span>
        </button>
      </>
    </div>

    <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accepted-orders-accordion">
      <div class="card-body">
        <ul>
    `;
    const order = acceptedOrders[i];
    for (let j = 0; j < order.food_items.length; j++) {
      string += `<li>${order.food_items[j].food_name}: ${order.food_items[j].quantity}</li>`;
    }
    string += `</ul></div></div></div>`;
  }

  $('#orders-container').append(string);

  ////////////////////////////////////////////////

  /////////////for completed orders///////
  // string = `<h3 id="completed-orders-section">Completed orders</h3><div class="accordion" id="completed-orders-accordion">`;
  // for (let i = 0; i < completedOrders.length; i++) {
  //   string += `<div class="card" id="${i}">
  //   <div class="card-header" id="heading${i}">
  //     <h2 class="mb-0">
  //       <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
  //         Order number ${completedOrders[i].order_id} by ${completedOrders[i].customer_name}
  //       </button>
  //     </h2>
  //   </div>

  //   <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#completed-orders-accordion">
  //     <div class="card-body">
  //       <ul>
  //   `;
  //   const order = completedOrders[i];
  //   for (let j = 0; j < order.food_items.length; j++) {
  //     string += `<li>${order.food_items[j].food_name}: ${order.food_items[j].quantity}</li>`;
  //   }
  //   string += `<button class="btn btn-primary pickedup" id="${i}">Picked Up</button></ul></div></div></div>`;
  // }

  // $('#orders-container').append(string);
  ///////////////////////////////////////


  let selected = '15 minutes';

  $('#waitTime').change(function () {
    selected = $(this).find("option:selected").text();
  });

  //when accept button is clicked, do ajax request to do an update to the order in db, with current timestamp
  $('button.accept').on('click', function(event) {
    event.preventDefault();
    console.log(`clicked ${event.target.id}`);
    console.log(`order accepted: ${incomingOrders[event.target.id].order_id}`);
    //remove the drop down and button (form)
    $(this).closest('form').remove();
    //update accepted_at to order_id
    $.ajax(`/orders/${incomingOrders[event.target.id].order_id}/accept`, {
      method: "POST",
      data: {
        waitTime: selected,
        phone: incomingOrders[event.target.id].phone,
        name: incomingOrders[event.target.id].customer_name
      }
    }).then(function() {
      console.log(`div#${event.target.id}.card`);

      $(`div#${event.target.id}.card.incoming-card`).fadeOut("slow", function() {
        event.stopPropagation();
        const $card = $(this);
        console.log("card is: ");
        console.log($card);
        $('#accepted-orders-accordion').append($card);
        $card.fadeIn(3000);
        //remove order from incomingorders, add to accepted, change the class of the accept button to complete
        // acceptedOrders.push(incomingOrders[event.target.id]);
        // incomingOrders.splice(event.target.id, 1);
        // console.log(incomingOrders);
        // console.log(acceptedOrders);
      });
    })
    .catch(err => {
      console.log(err);
    })
  });

  // $('button.complete').on('click', function(event) {
  //   console.log(`clicked ${event.target.id}`);
  //   console.log(`order completed: ${acceptedOrders[event.target.id].order_id}`);
  //   //update accepted_at to order_id
  //   $.ajax(`/orders/${acceptedOrders[event.target.id].order_id}/complete`, {
  //     method: "POST"
  //   })
  //   .then(function() {
  //     console.log(`div#${event.target.id}.card`);
  //     $(`div#${event.target.id}.card`).fadeOut("slow", function() {
  //       event.stopPropagation();
  //       const card = $(`div#${event.target.id}.card`).html();
  //       console.log(card);
  //       $('#completed-orders-accordion').append(card).fadeIn(3000);
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // });

  $('.nav-item').on("click", function() {
    $('.nav-item').removeClass('active');
    $(this).addClass('active');
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
    setTimeout(() => {
      location.reload();
     });
   });
});
