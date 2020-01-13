SELECT foods.*
FROM foods
JOIN restaurants on foods.restaurant_id = restaurants.id
WHERE restaurants.id = 1 AND foods.name LIKE '%Burger%';
