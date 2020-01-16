SELECT orders.*, customers.name as customer_name, line_items.*, foods.name
FROM orders
JOIN restaurants ON orders.restaurant_id = restaurants.id
JOIN customers ON customers.id = orders.customer_id
JOIN line_items ON line_items.order_id = orders.id
JOIN foods ON line_items.food_id = foods.id
WHERE restaurants.id = 1;
