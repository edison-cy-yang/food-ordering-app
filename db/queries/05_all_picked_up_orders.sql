SELECT orders.*
FROM orders
JOIN restaurants ON orders.restaurant_id = restaurants.id
WHERE restaurants.id = 1 AND orders.pickedup_at IS NOT NULL;
