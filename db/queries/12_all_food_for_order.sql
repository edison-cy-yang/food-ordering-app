SELECT foods.name, foods.price, line_items.quantity
FROM foods
JOIN line_items ON foods.id = line_items.food_id
JOIN orders ON line_items.order_id = orders.id
WHERE orders.id = 1;
