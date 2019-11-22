-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 22, 2019 at 08:52 PM
-- Server version: 5.7.28-0ubuntu0.18.04.4
-- PHP Version: 7.2.24-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `janmariv`
--

-- --------------------------------------------------------

--
-- Table structure for table `Article`
--

CREATE TABLE `Article` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `body` text,
  `image` text,
  `important` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Article`
--

INSERT INTO `Article` (`id`, `title`, `body`, `image`, `important`, `createdAt`, `updatedAt`, `category`) VALUES
(1, 'NewsTitle1Edited', 'NewsBody1Edited', 'https://images.unsplash.com/photo-1494972688394-4cc796f9e4c5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5966fbd4a3212dc13c7ad81c4d665354&auto=format&fit=crop&w=1350&q=80', 1, '2019-11-22 19:18:58', '2019-11-22 19:18:58', 'News'),
(2, 'SportTitle1', 'SportBody1', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=10794df94c2543bee8f590b3681452c7&auto=format&fit=crop&w=1350&q=80', 0, '2019-11-22 19:18:58', '2019-11-22 19:18:58', 'Sport'),
(3, 'SportTitle2', 'SportBody2', 'https://images.unsplash.com/photo-1513907450027-b9926e160c2a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=825b2571e6253b4336f0fba4604e6443&auto=format&fit=crop&w=1349&q=80', 1, '2019-11-22 19:18:58', '2019-11-22 19:18:58', 'Sport');

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `category` varchar(255) NOT NULL,
  `priority` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`category`, `priority`) VALUES
('Culture', 3),
('News', 1),
('Sport', 2),
('Tech', 4);

-- --------------------------------------------------------

--
-- Table structure for table `Comment`
--

CREATE TABLE `Comment` (
  `id` int(11) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `comment` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `article_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Comment`
--

INSERT INTO `Comment` (`id`, `nickname`, `comment`, `createdAt`, `updatedAt`, `article_id`) VALUES
(1, 'anonym88', 'Freedom...', '2019-11-22 19:18:58', '2019-11-22 19:18:58', 1),
(2, 'anonymNew', 'NewComment', '2019-11-22 19:18:58', '2019-11-22 19:18:58', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Article`
--
ALTER TABLE `Article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`category`);

--
-- Indexes for table `Comment`
--
ALTER TABLE `Comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_id` (`article_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Article`
--
ALTER TABLE `Article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Comment`
--
ALTER TABLE `Comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Article`
--
ALTER TABLE `Article`
  ADD CONSTRAINT `Article_ibfk_1` FOREIGN KEY (`category`) REFERENCES `Category` (`category`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Comment`
--
ALTER TABLE `Comment`
  ADD CONSTRAINT `Comment_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `Article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
