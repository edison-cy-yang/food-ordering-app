# Food Ordering App

An online platform where users can sign in as either a customer who can order food or a restaurant owner who can receive the orders.

## Installing Dependencies

```sh

npm install

```

## Running the Server

```sh

npm start

```

## Dependencies

* twilio
* bcrypt
* body-parser
* cookie-session
* ejs
* express
* node-sass-middleware
* pg
* pg-native


## Screenshots of different views
Home Page
: App title with links to social network websites and a button to get started!
!["Root Page"](https://github.com/sjs5953/jungle-rails/blob/master/images/Root%20Page.png?raw=true)

Login Page
: User can sign up, login as either customer or restaurant owner
!["Login Page"](https://github.com/sjs5953/jungle-rails/blob/master/images/cart%20page.png?raw=true)

Menu Page 1
: The restaurant title is displayed with a button which will smoothly scroll down to show the menu
!["Menu Page 1"](https://github.com/sjs5953/jungle-rails/blob/master/images/Payment.png?raw=true)

Menu Page 2
: Displays the menu, with the arrow buttons which can be clicked to add to cart
!["Menu Page 2"](https://github.com/sjs5953/jungle-rails/blob/master/images/Order%20Summary.png?raw=true)

Menu Page 3
: Once the user starts adding items, the button to open the cart shows up from the bottom with shaking animation
!["Menu Page 3"](https://github.com/sjs5953/jungle-rails/blob/master/images/Admin%20Products.png?raw=true)

Menu Page 4
: Once click the cart button, a box shows up with the added items, total amount (before tax), and proceed button. The quantity of each item is "dynamic" so if the user changes the amount while the cart is open, it live updates the quantity
!["Menu Page 4"](https://github.com/sjs5953/jungle-rails/blob/master/images/New%20product.png?raw=true)

Order Review Page
: This page shows information about the restaurant which is dynamically derived from the database, estamated processing time, the selected items, total amount after tax, and the check out button.
!["Order Review Page"](https://github.com/sjs5953/jungle-rails/blob/master/images/Admin%20categories.png?raw=true)

Order Confirmation
: This page confirms that the order has been placed
!["Order Confirmation"](https://github.com/sjs5953/jungle-rails/blob/master/images/new%20category.png?raw=true)

Text Message for owner
: The restaurant owner receives a text message that indicates that there is a new order
!["Text Message for owner"](https://github.com/sjs5953/jungle-rails/blob/master/images/new%20category.png?raw=true)

Restaurant Side Page
: The restaurant owner can see incoming order, accepted order, and completed order
!["Restaurant Side Page](https://github.com/sjs5953/jungle-rails/blob/master/images/new%20category.png?raw=true)

Restaurant Side Page
: Based on estimated processing time and outstanding orders, the owner can choose an estimated waiting time for the customer
!["Restaurant Side Page"](https://github.com/sjs5953/jungle-rails/blob/master/images/new%20category.png?raw=true)

Restaurant Side Page 2
: Once clicking accept button, the order box goes to 'Accepted Orders' section
!["Restaurant Side Page 2"](https://github.com/sjs5953/jungle-rails/blob/master/images/new%20category.png?raw=true)

Text Message for the customer
: The customer receiveS a text message that says the order is acceted with estimated waiting time
!["Text Message for the customer"](https://github.com/sjs5953/jungle-rails/blob/master/images/new%20category.png?raw=true)

Restaurant Side Page 3
: Once the customer picks up their items, the owner clicks complete and the order goes to 'Completed Orders' Section. And the owner waits for the next order
!["Restaurant Side Page 3"](https://github.com/sjs5953/jungle-rails/blob/master/images/new%20category.png?raw=true)

