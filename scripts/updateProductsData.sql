-- Update all products with sample data for rating, reviews, sales, earnings, stock, and status

-- First, let's set random values for each product
UPDATE products
SET 
  rating = ROUND((4.0 + RANDOM() * 1.0)::numeric, 1),
  reviews = FLOOR(50 + RANDOM() * 250)::integer,
  sales = FLOOR(300 + RANDOM() * 2000)::integer,
  stock = FLOOR(RANDOM() * 200)::integer;

-- Calculate earnings based on price * sales
UPDATE products
SET earnings = (price::numeric * sales::numeric)::numeric;

-- Set status based on stock levels
UPDATE products
SET status = CASE
  WHEN stock = 0 THEN 'out'
  WHEN stock < 20 THEN 'low'
  ELSE 'in'
END;

-- Show updated counts
SELECT 
  COUNT(*) as total_products,
  COUNT(*) FILTER (WHERE status = 'in') as in_stock,
  COUNT(*) FILTER (WHERE status = 'low') as low_stock,
  COUNT(*) FILTER (WHERE status = 'out') as out_of_stock,
  ROUND(AVG(rating::numeric), 2) as avg_rating,
  SUM(sales) as total_sales,
  SUM(earnings::numeric) as total_earnings
FROM products;
