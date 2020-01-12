INSERT INTO users (email, password)
VALUES ('edison.cy.yang@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('tim@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('jim@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO customers (user_id, name, phone)
VALUES (1, 'edison', '6047236218'),
(2, 'tim', '6041234567'),
(3, 'jim', '6040000000');


INSERT INTO restaurants (
  owner_id,
  name,
  country,
  street,
  city,
  province,
  post_code,
  phone,
  hours,
  category
) VALUES (
  1,
  'Five Guys',
  'Canada',
  '635 Robson St',
  'Vancouver',
  'BC',
  'V6B 5J3',
  '604-685-1585',
  '11a.m.-10p.m.',
  'Fast food restaurant'
),
(
  2,
  'McDonalds',
  'Canada',
  '275 Robson St',
  'Vancouver',
  'BC',
  'V6B 0E7',
  '604-689-0804',
  '24 hours',
  'Fast food restaurant'
);

INSERT INTO foods (
  restaruant_id,
  name,
  description,
  price,
  estimated_time,
  category
) VALUES (
  1,
  'Little Burger',
  'Burger that is little',
  1000,
  15,
  'entrees'
),
(
  1,
  'Average Burger',
  'Burger that is average sized',
  1500,
  20,
  'entrees'
),
(
  1,
  'Big Burger',
  'Burger that is big',
  2000,
  25,
  'entrees'
),
(
  1,
  'Giant Burger',
  'Burger that is giant',
  2500,
  30,
  'entrees'
),
(
  1,
  'Super Burger',
  'Burger that is super',
  3000,
  45,
  'entrees'
);


INSERT INTO orders (restaurant_id, customer_id, created_at, total_price, points_earned)
VALUES (1, 1, '2018-02-12T08:08:40.000Z', 1000, 10),
(1, 2, '2018-02-12T08:08:40.000Z', 1200, 12),
(1, 1, '2018-02-12T08:08:40.000Z', 1500, 15);


INSERT INTO line_items (
  order_id,
  food_id,
  quantity
) VALUES (
  1,
  1,
  1
),(
  2,
  2,
  2
),(
  3,
  3,
  3
);
