-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2025 at 11:05 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mymealsdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `cash_payments`
--

CREATE TABLE `cash_payments` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `paid_by` varchar(255) DEFAULT NULL,
  `dname` varchar(255) DEFAULT NULL,
  `dnum` varchar(255) DEFAULT NULL,
  `pdate` datetime DEFAULT NULL,
  `note` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_no` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complaints`
--

INSERT INTO `complaints` (`id`, `user_id`, `subject`, `description`, `status`, `created_at`, `order_no`) VALUES
(1, 1, 'Food', 'bnm', 'pending', '2025-12-08 06:26:23', NULL),
(2, 1, 'Food', 'vbnm,', 'pending', '2025-12-08 07:33:35', NULL),
(3, 1, 'Food', 'bghnjmk', 'pending', '2025-12-08 07:35:47', NULL),
(4, 1, 'Food', 'bhnjmk', 'pending', '2025-12-08 09:33:35', NULL),
(5, 1, 'Food', 'njm,', 'pending', '2025-12-08 09:40:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `delivery_locations`
--

CREATE TABLE `delivery_locations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `address_line_1` varchar(255) DEFAULT NULL,
  `address_line_2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_no` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `plan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `delivery_locations`
--

INSERT INTO `delivery_locations` (`id`, `user_id`, `address_line_1`, `address_line_2`, `city`, `state`, `zip_code`, `is_default`, `created_at`, `order_no`, `name`, `email`, `phone`, `plan`) VALUES
(1, 1, 'salipur', '', 'skmxlas', '1kml,ls', '1l,l,l', 0, '2025-12-08 06:25:17', NULL, NULL, NULL, NULL, NULL),
(2, 1, 'salipur', '', 'skmxlas', '1kml,ls', '1l,l,l', 0, '2025-12-08 06:58:28', NULL, NULL, NULL, NULL, NULL),
(3, 1, 'salipur', '', 'skmxlas', '1kml,ls', '1l,l,l', 0, '2025-12-08 07:02:27', NULL, NULL, NULL, NULL, NULL),
(4, 1, 'salipur', '', 'skmxlas', '1kml,ls', '1l,l,l', 0, '2025-12-08 07:06:45', '1234', 'Taslima Nisan', 'taslimanisan69@gmail.com', '08260145534', 'Combo (Lunch & Dinner)');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_no` varchar(255) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `plan_name` varchar(255) DEFAULT NULL,
  `overall_comments` text DEFAULT NULL,
  `selected_date` date DEFAULT NULL,
  `food_rating` varchar(255) DEFAULT NULL,
  `food_comments` text DEFAULT NULL,
  `delivery_rating` varchar(255) DEFAULT NULL,
  `delivery_comments` text DEFAULT NULL,
  `management_rating` varchar(255) DEFAULT NULL,
  `management_comments` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `user_id`, `order_no`, `customer_name`, `phone_number`, `plan_name`, `overall_comments`, `selected_date`, `food_rating`, `food_comments`, `delivery_rating`, `delivery_comments`, `management_rating`, `management_comments`, `created_at`) VALUES
(1, 1, '1234', 'taslima Nisan', '8260145534', 'combo_lunch_dinner', 'nmk,l', '2025-12-08', 'Excellent', 'qwerfg', 'Good', 'nm,', 'Excellent', 'n m,', '2025-12-08 06:27:15');

-- --------------------------------------------------------

--
-- Table structure for table `meals`
--

CREATE TABLE `meals` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `meal_preferences`
--

CREATE TABLE `meal_preferences` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_no` varchar(255) DEFAULT NULL,
  `meal_type` varchar(255) DEFAULT NULL,
  `preference_details` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `plan` varchar(255) DEFAULT NULL,
  `effective_from` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meal_preferences`
--

INSERT INTO `meal_preferences` (`id`, `user_id`, `order_no`, `meal_type`, `preference_details`, `is_active`, `created_at`, `name`, `email`, `plan`, `effective_from`) VALUES
(1, NULL, '12345', 'Veg', '{\"dishChoice\":\"\",\"avoidNonVeg\":\"gvhb\",\"avoidVeg\":\"\"}', 1, '2025-12-08 06:10:19', NULL, NULL, NULL, NULL),
(2, NULL, '12345', 'Veg', '{\"dishChoice\":\"\",\"avoidNonVeg\":\"gvhb\",\"avoidVeg\":\"jhbh\"}', 1, '2025-12-08 06:14:25', NULL, NULL, NULL, NULL),
(3, NULL, '12345', 'Veg', '{\"dishChoice\":\"\",\"avoidNonVeg\":\"gvhb\",\"avoidVeg\":\"jhbh\"}', 1, '2025-12-08 06:16:33', NULL, NULL, NULL, NULL),
(4, NULL, '12345', 'Veg', '{\"dishChoice\":\"\",\"avoidNonVeg\":\"gvhb\",\"avoidVeg\":\"jhbh\"}', 1, '2025-12-08 06:17:18', NULL, NULL, NULL, NULL),
(5, NULL, '12345', 'Veg', '{\"dishChoice\":\"\",\"avoidNonVeg\":\"gvhb\",\"avoidVeg\":\"jhbh\"}', 1, '2025-12-08 06:22:46', NULL, NULL, NULL, NULL),
(6, NULL, '12345', 'Veg', '{\"dishChoice\":\"\",\"avoidNonVeg\":\"gvhb\",\"avoidVeg\":\"jhbh\"}', 1, '2025-12-08 06:23:59', NULL, NULL, NULL, NULL),
(7, NULL, '12345', 'Veg', '{\"dishChoice\":\"\",\"avoidNonVeg\":\"gvhb\",\"avoidVeg\":\"jhbh\"}', 1, '2025-12-08 06:38:55', NULL, NULL, NULL, NULL),
(8, NULL, '12345', 'Veg', '{\"dishChoice\":\"\",\"avoidNonVeg\":\"gvhb\",\"avoidVeg\":\"jhbh\"}', 1, '2025-12-08 06:45:21', 'Taslima Nisan', 'taslimanisan69@gmail.com', 'Combo Lunch & Dinner', '2025-12-28');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `plan_id` int(11) DEFAULT NULL,
  `payment_method` varchar(20) DEFAULT NULL,
  `status` enum('pending','paid','delivered','cancelled') DEFAULT 'pending',
  `total_amount` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `qr_amount` decimal(10,2) DEFAULT NULL,
  `qr_transaction_id` varchar(255) DEFAULT NULL,
  `qr_note` text DEFAULT NULL,
  `qr_screenshot` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `primary_address` text DEFAULT NULL,
  `secondary_address` text DEFAULT NULL,
  `delivery_time` varchar(50) DEFAULT NULL,
  `plan` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `plan_id`, `payment_method`, `status`, `total_amount`, `created_at`, `qr_amount`, `qr_transaction_id`, `qr_note`, `qr_screenshot`, `name`, `phone`, `email`, `primary_address`, `secondary_address`, `delivery_time`, `plan`) VALUES
(6, NULL, NULL, 'QR', 'pending', 1200.00, '2025-12-09 10:01:45', NULL, NULL, NULL, NULL, 'Taslima Nisan', '08260145534', 'taslimanisan69@gmail.com', 'salipur', 'bhubaneswar', '15:10', 'Combo lunch and breakfast');

-- --------------------------------------------------------

--
-- Table structure for table `order_meals`
--

CREATE TABLE `order_meals` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `meal_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `otps`
--

CREATE TABLE `otps` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pause_resume_meals`
--

CREATE TABLE `pause_resume_meals` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_no` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `reason` text DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  `meal_type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `plan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pause_resume_meals`
--

INSERT INTO `pause_resume_meals` (`id`, `user_id`, `order_no`, `start_date`, `end_date`, `reason`, `status`, `meal_type`, `created_at`, `name`, `email`, `phone`, `plan`) VALUES
(1, 1, '1234', '2025-12-09', '2025-12-10', 'gvbhnjkm,l', 'Pause', 'Lunch', '2025-12-08 10:56:31', 'Taslima Nisan', 'taslimanisan69@gmail.com', '08260145534', '3');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `payment_method` enum('cash','card','online') DEFAULT 'cash',
  `amount` decimal(10,2) DEFAULT NULL,
  `status` enum('pending','completed','failed') DEFAULT 'pending',
  `paid_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `planslist`
--

CREATE TABLE `planslist` (
  `id` int(11) NOT NULL,
  `plan_name` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `qr_payments`
--

CREATE TABLE `qr_payments` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `screenshot` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `qr_payments`
--

INSERT INTO `qr_payments` (`id`, `order_id`, `amount`, `transaction_id`, `note`, `screenshot`) VALUES
(1, 6, 1200.00, 'od2343u84u8u438', 'vhgbv hn', 'C:\\Users\\tasli\\Downloads\\MyMealsApp-main\\MyMealsApp-main\\backend\\uploads\\transactions\\1765274505806-153637719.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `renewal_payments`
--

CREATE TABLE `renewal_payments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `next_renewal_date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `order_no` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `plan` varchar(255) DEFAULT NULL,
  `renewal_month` varchar(255) DEFAULT NULL,
  `amount_paid` decimal(10,2) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `cash_paid` tinyint(1) DEFAULT NULL,
  `payment_mode` varchar(255) DEFAULT NULL,
  `delivery_boy_name` varchar(255) DEFAULT NULL,
  `delivery_boy_phone` varchar(255) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `delivery_time` time DEFAULT NULL,
  `office_date` date DEFAULT NULL,
  `office_time` time DEFAULT NULL,
  `note` text DEFAULT NULL,
  `screenshot` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `renewal_payments`
--

INSERT INTO `renewal_payments` (`id`, `user_id`, `amount`, `payment_date`, `next_renewal_date`, `status`, `order_no`, `location`, `name`, `email`, `phone`, `address`, `plan`, `renewal_month`, `amount_paid`, `transaction_id`, `cash_paid`, `payment_mode`, `delivery_boy_name`, `delivery_boy_phone`, `delivery_date`, `delivery_time`, `office_date`, `office_time`, `note`, `screenshot`) VALUES
(1, 1, NULL, NULL, NULL, NULL, '12345', 'Old', 'Taslima Nisan', 'taslimanisan69@gmail.com', '08260145534', 'salipur', 'comboLunchDinnerBreakfast', '1', 1200.00, '', 0, 'Delivery Boy', 'ghvbjhbj', 'vgnbvhbj', '2025-12-08', '11:38:00', '0000-00-00', '00:00:00', 'bhjbn', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `password`, `phone`, `image`) VALUES
(1, 'taslimanisan69@gmail.com', 'Sabir', '12345', 1234567890, 'uploads/profile/1765191608453-IMG-20241107-WA0014.jpg'),
(2, 'alice@example.com', 'Alice', 'password', 1234567891, 'uploads/profile/1765016150192-WhatsApp Image 2025-12-06 at 15.45.08.jpeg'),
(3, 'bob@example.com', 'Bob', 'password', 1234567892, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_contact_updates`
--

CREATE TABLE `user_contact_updates` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `field_name` varchar(255) DEFAULT NULL,
  `old_value` varchar(255) DEFAULT NULL,
  `new_value` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_no` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `plan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_contact_updates`
--

INSERT INTO `user_contact_updates` (`id`, `user_id`, `field_name`, `old_value`, `new_value`, `status`, `created_at`, `order_no`, `name`, `email`, `plan`) VALUES
(1, 1, 'phone', '+918260145534', '+918961941902', 'pending', '2025-12-08 06:25:47', NULL, NULL, NULL, NULL),
(2, 1, 'phone', '+918260145534', '+919439419295', 'pending', '2025-12-08 07:32:21', '1234', 'Taslima Nisan', 'taslimanisan69@gmail.com', 'Combo');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cash_payments`
--
ALTER TABLE `cash_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `delivery_locations`
--
ALTER TABLE `delivery_locations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `meals`
--
ALTER TABLE `meals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meal_preferences`
--
ALTER TABLE `meal_preferences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `plan_id` (`plan_id`);

--
-- Indexes for table `order_meals`
--
ALTER TABLE `order_meals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `meal_id` (`meal_id`);

--
-- Indexes for table `otps`
--
ALTER TABLE `otps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `pause_resume_meals`
--
ALTER TABLE `pause_resume_meals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `planslist`
--
ALTER TABLE `planslist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `qr_payments`
--
ALTER TABLE `qr_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `renewal_payments`
--
ALTER TABLE `renewal_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_contact_updates`
--
ALTER TABLE `user_contact_updates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cash_payments`
--
ALTER TABLE `cash_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `delivery_locations`
--
ALTER TABLE `delivery_locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `meals`
--
ALTER TABLE `meals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meal_preferences`
--
ALTER TABLE `meal_preferences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `order_meals`
--
ALTER TABLE `order_meals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `otps`
--
ALTER TABLE `otps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pause_resume_meals`
--
ALTER TABLE `pause_resume_meals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `planslist`
--
ALTER TABLE `planslist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `qr_payments`
--
ALTER TABLE `qr_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `renewal_payments`
--
ALTER TABLE `renewal_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_contact_updates`
--
ALTER TABLE `user_contact_updates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cash_payments`
--
ALTER TABLE `cash_payments`
  ADD CONSTRAINT `cash_payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `complaints`
--
ALTER TABLE `complaints`
  ADD CONSTRAINT `complaints_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `delivery_locations`
--
ALTER TABLE `delivery_locations`
  ADD CONSTRAINT `delivery_locations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `meal_preferences`
--
ALTER TABLE `meal_preferences`
  ADD CONSTRAINT `meal_preferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`);

--
-- Constraints for table `order_meals`
--
ALTER TABLE `order_meals`
  ADD CONSTRAINT `order_meals_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_meals_ibfk_2` FOREIGN KEY (`meal_id`) REFERENCES `meals` (`id`);

--
-- Constraints for table `otps`
--
ALTER TABLE `otps`
  ADD CONSTRAINT `otps_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `qr_payments`
--
ALTER TABLE `qr_payments`
  ADD CONSTRAINT `qr_payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `renewal_payments`
--
ALTER TABLE `renewal_payments`
  ADD CONSTRAINT `renewal_payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_contact_updates`
--
ALTER TABLE `user_contact_updates`
  ADD CONSTRAINT `user_contact_updates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
