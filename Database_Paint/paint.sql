-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 20, 2022 at 07:46 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `paint`
--

-- --------------------------------------------------------

--
-- Table structure for table `draw`
--

CREATE TABLE `draw` (
  `id` int(10) UNSIGNED NOT NULL,
  `liste` json DEFAULT NULL,
  `users_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `draw`
--

INSERT INTO `draw` (`id`, `liste`, `users_id`) VALUES
(1, '[{\"x\": 231.6458282470703, \"y\": 63, \"color\": \"red\", \"width\": 100, \"height\": 100, \"select\": false, \"stroke\": \"#000\"}, {\"x\": 732.6458282470703, \"y\": 410, \"color\": \"green\", \"radius\": 50, \"select\": true, \"stroke\": \"#OOO\"}]', 1),
(2, '[{\"x\": 56.64582824707031, \"y\": 97, \"color\": \"red\", \"width\": 100, \"height\": 100, \"select\": false, \"stroke\": \"#000\"}, {\"x\": 887.6458282470703, \"y\": 90, \"color\": \"green\", \"radius\": 50, \"select\": true, \"stroke\": \"#OOO\"}]', 2),
(3, '[{\"x\": 56.64582824707031, \"y\": 97, \"color\": \"red\", \"width\": 100, \"height\": 100, \"select\": false, \"stroke\": \"#000\"}, {\"x\": 887.6458282470703, \"y\": 90, \"color\": \"green\", \"radius\": 50, \"select\": false, \"stroke\": \"#OOO\"}, {\"x\": 56.64582824707031, \"y\": 97, \"color\": \"red\", \"width\": 100, \"height\": 100, \"select\": false, \"stroke\": \"#000\"}, {\"x\": 887.6458282470703, \"y\": 90, \"color\": \"green\", \"radius\": 50, \"select\": false, \"stroke\": \"#OOO\"}, {\"x\": 380.6458282470703, \"y\": 242, \"color\": \"red\", \"width\": 100, \"height\": 100, \"select\": false, \"stroke\": \"#000\"}, {\"x\": 611.6458282470703, \"y\": 109, \"color\": \"red\", \"width\": 100, \"height\": 100, \"select\": false, \"stroke\": \"#000\"}, {\"color\": \"purple\", \"pointA\": {\"x\": 171.6458282470703, \"y\": 336}, \"pointB\": {\"x\": 221.6458282470703, \"y\": 436}, \"pointC\": {\"x\": 121.64582824707033, \"y\": 436}, \"select\": true, \"stroke\": \"#000\"}]', 2),
(4, '[{\"x\": 56.64582824707031, \"y\": 97, \"color\": \"red\", \"width\": 100, \"height\": 100, \"select\": false, \"stroke\": \"#000\"}, {\"x\": 887.6458282470703, \"y\": 90, \"color\": \"green\", \"radius\": 50, \"select\": false, \"stroke\": \"#OOO\"}, {\"x\": 56.64582824707031, \"y\": 97, \"color\": \"red\", \"width\": 100, \"height\": 100, \"select\": false, \"stroke\": \"#000\"}, {\"x\": 887.6458282470703, \"y\": 90, \"color\": \"green\", \"radius\": 50, \"select\": false, \"stroke\": \"#OOO\"}, {\"x\": 380.6458282470703, \"y\": 242, \"color\": \"red\", \"width\": 100, \"height\": 100, \"select\": false, \"stroke\": \"#000\"}, {\"x\": 611.6458282470703, \"y\": 109, \"color\": \"red\", \"width\": 100, \"height\": 100, \"select\": false, \"stroke\": \"#000\"}, {\"color\": \"purple\", \"pointA\": {\"x\": 171.6458282470703, \"y\": 336}, \"pointB\": {\"x\": 221.6458282470703, \"y\": 436}, \"pointC\": {\"x\": 121.64582824707033, \"y\": 436}, \"select\": true, \"stroke\": \"#000\"}, {\"x\": 138.6458282470703, \"y\": 56, \"color\": \"red\", \"width\": 100, \"height\": 100, \"select\": false, \"stroke\": \"#000\"}, {\"x\": 477.6458282470703, \"y\": 113, \"color\": \"green\", \"radius\": 50, \"select\": false, \"stroke\": \"#OOO\"}, {\"x\": 701.6458282470703, \"y\": 108, \"color\": \"green\", \"radius\": 50, \"select\": false, \"stroke\": \"#OOO\"}, {\"color\": \"purple\", \"pointA\": {\"x\": 310.6458282470703, \"y\": 319}, \"pointB\": {\"x\": 360.6458282470703, \"y\": 419}, \"pointC\": {\"x\": 260.6458282470703, \"y\": 419}, \"select\": false, \"stroke\": \"#000\"}, {\"color\": \"purple\", \"pointA\": {\"x\": 639.6458282470703, \"y\": 332}, \"pointB\": {\"x\": 689.6458282470703, \"y\": 432}, \"pointC\": {\"x\": 589.6458282470703, \"y\": 432}, \"select\": true, \"stroke\": \"#000\"}]', 2),
(5, '[{\"x\": 147.6458282470703, \"y\": 44, \"color\": \"red\", \"width\": 100, \"height\": 100, \"select\": false, \"stroke\": \"#000\"}, {\"color\": \"purple\", \"pointA\": {\"x\": 699.6458282470703, \"y\": 91}, \"pointB\": {\"x\": 749.6458282470703, \"y\": 191}, \"pointC\": {\"x\": 649.6458282470703, \"y\": 191}, \"select\": false, \"stroke\": \"#000\"}, {\"x\": 83.64582824707031, \"y\": 421, \"color\": \"green\", \"radius\": 50, \"select\": false, \"stroke\": \"#OOO\"}, {\"x\": 510.6458282470703, \"y\": 419, \"color\": \"green\", \"radius\": 50, \"select\": false, \"stroke\": \"#OOO\"}, {\"x\": 891.6458282470703, \"y\": 416, \"color\": \"green\", \"radius\": 50, \"select\": true, \"stroke\": \"#OOO\"}]', 1),
(6, '[{\"x\": 147.6458282470703, \"y\": 44, \"color\": \"red\", \"width\": 100, \"height\": 100, \"select\": false, \"stroke\": \"#000\"}, {\"color\": \"purple\", \"pointA\": {\"x\": 699.6458282470703, \"y\": 91}, \"pointB\": {\"x\": 749.6458282470703, \"y\": 191}, \"pointC\": {\"x\": 649.6458282470703, \"y\": 191}, \"select\": false, \"stroke\": \"#000\"}, {\"x\": 83.64582824707031, \"y\": 421, \"color\": \"green\", \"radius\": 50, \"select\": false, \"stroke\": \"#OOO\"}, {\"x\": 510.6458282470703, \"y\": 419, \"color\": \"green\", \"radius\": 50, \"select\": false, \"stroke\": \"#OOO\"}, {\"x\": 891.6458282470703, \"y\": 416, \"color\": \"green\", \"radius\": 50, \"select\": true, \"stroke\": \"#OOO\"}, {\"color\": \"purple\", \"pointA\": {\"x\": 259.6458282470703, \"y\": 354}, \"pointB\": {\"x\": 309.6458282470703, \"y\": 454}, \"pointC\": {\"x\": 209.6458282470703, \"y\": 454}, \"select\": false, \"stroke\": \"#000\"}, {\"color\": \"purple\", \"pointA\": {\"x\": 265.6458282470703, \"y\": 158}, \"pointB\": {\"x\": 315.6458282470703, \"y\": 258}, \"pointC\": {\"x\": 215.6458282470703, \"y\": 258}, \"select\": false, \"stroke\": \"#000\"}, {\"color\": \"purple\", \"pointA\": {\"x\": 485.6458282470703, \"y\": 151}, \"pointB\": {\"x\": 535.6458282470703, \"y\": 251}, \"pointC\": {\"x\": 435.6458282470703, \"y\": 251}, \"select\": false, \"stroke\": \"#000\"}, {\"x\": 649.6458282470703, \"y\": 168, \"color\": \"red\", \"width\": 100, \"height\": 305, \"select\": true, \"stroke\": \"#000\"}]', 1),
(7, '[{\"x\": 387.6458282470703, \"y\": 115, \"color\": \"red\", \"width\": 100, \"height\": 100, \"select\": false, \"stroke\": \"#000\"}, {\"color\": \"purple\", \"pointA\": {\"x\": 128.6458282470703, \"y\": 341}, \"pointB\": {\"x\": 178.6458282470703, \"y\": 441}, \"pointC\": {\"x\": 78.64582824707031, \"y\": 441}, \"select\": false, \"stroke\": \"#000\"}, {\"x\": 697.6458282470703, \"y\": 313, \"color\": \"green\", \"radius\": 50, \"select\": true, \"stroke\": \"#OOO\"}]', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `mail` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `mail`) VALUES
(1, 'admin', '$2y$10$X./fyD4i6jPUArDasAtHoeVe2dHMyE3Tz0mcxfwtzI4nSOb21tdVC', 'admin@admin.fr'),
(2, 'fabrice', '$2y$10$TeCuSjj92/QnsGClLDFnGu3IiGRvhNQHeAn5pyszFROpiSLKKvwsy', 'fabrice@fabrice.fr');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `draw`
--
ALTER TABLE `draw`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `draw`
--
ALTER TABLE `draw`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `draw`
--
ALTER TABLE `draw`
  ADD CONSTRAINT `draw_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
