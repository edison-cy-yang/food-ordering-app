INSERT INTO users (email, password)
VALUES ('jolanga@naver.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('tim@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('jim@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO customers (user_id, name, phone)
VALUES (1, 'Jay Seo', '7786809238'),
(2, 'tim', '6047236218'),
(3, 'jim', '6040000000');


INSERT INTO restaurants (
  owner_id,
  name,
  image_url,
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
  'https://www.wantedinrome.com/i/preview/storage/uploads/2019/12/five-guys-rome.jpg',
  'Canada',
  '635 Robson St',
  'Vancouver',
  'BC',
  'V6B 5J3',
  '778-680-9238',
  '11a.m.-10p.m.',
  'Fast food restaurant'
),
(
  2,
  'McDonalds',
  'https://www.wantedinrome.com/i/preview/storage/uploads/2019/12/five-guys-rome.jpg',
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
  restaurant_id,
  name,
  description,
  price,
  estimated_time,
  category,
  is_popular
) VALUES (
  1,
  'Little Burger',
  'Burger that is little',
  1000,
  5,
  'entrees',
  false
),
(
  1,
  'Average Burger',
  'Burger that is average sized',
  1500,
  5,
  'entrees',
  false
),
(
  1,
  'Big Burger',
  'Burger that is big',
  2000,
  10,
  'entrees',
  false
),
(
  1,
  'Giant Burger',
  'Burger that is giant',
  2500,
  10,
  'entrees',
  true
),
(
  1,
  'Super Burger',
  'Burger that is super',
  3000,
  10,
  'entrees',
  true
);


INSERT INTO orders (restaurant_id, customer_id, created_at, total_price, points_earned, estimated_time)
VALUES (1, 1, '2018-02-12T08:08:40.000Z', 1000, 10, '30 minutes'),
(1, 2, '2018-02-12T08:08:40.000Z', 1200, 12, '20 minutes'),
(1, 1, '2018-02-12T08:08:40.000Z', 1500, 15, '1 hour(s) 10 minute(s)');


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
