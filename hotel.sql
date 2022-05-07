-- MySQL dump 10.13  Distrib 5.7.37, for Linux (x86_64)
--
-- Host: localhost    Database: hotel
-- ------------------------------------------------------
-- Server version	5.7.37-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `no_telpon` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `jenis_kelamin` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'uus','00912212','us@gmail.com','$2b$10$CCItjPmrPr1ppXWxtdXlzesXQ3Jj5lboC0NdgwqVC2RmG86mv/RPW','laki-laki'),(2,'uus',NULL,'uus@customer.com','$2b$10$0TBCzJI1UyhwTpJuZxHF4O4ZiCTGiRo0hTLgAhMzb2EJrMwfPkWFG','Laki-Laki'),(3,'forceki',NULL,'uus2@gmail.com','$2b$10$O3lr4sd01mt3KquDJ/2L0Okt72u.vI4B9QXiFmhK8NBb/drX71J6S','Perempuan'),(4,'testing1','081904118212','test@customer.com','$2b$10$g1C64/toU5wLHviqv755gOgrxnZq5zCWNpMNaHAJH6EYxZn4NpvLm','Laki-Laki');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_kamar`
--

DROP TABLE IF EXISTS `inventory_kamar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_kamar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jenis_kamar_id` int(11) DEFAULT NULL,
  `nama` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `inventory_kamar_FK` (`jenis_kamar_id`),
  CONSTRAINT `inventory_kamar_FK` FOREIGN KEY (`jenis_kamar_id`) REFERENCES `jenis_kamar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_kamar`
--

LOCK TABLES `inventory_kamar` WRITE;
/*!40000 ALTER TABLE `inventory_kamar` DISABLE KEYS */;
INSERT INTO `inventory_kamar` VALUES (20,1,'Kasur'),(21,3,'Alat Mandi'),(30,21,'Ac'),(31,21,'Coffe'),(32,21,'Bed 2'),(33,21,'balcon'),(34,1,'AC'),(35,1,'Perlengkapan Lengkap');
/*!40000 ALTER TABLE `inventory_kamar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jenis_kamar`
--

DROP TABLE IF EXISTS `jenis_kamar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jenis_kamar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `harga_kamar` int(11) DEFAULT NULL,
  `max_kapasitas` float DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jenis_kamar`
--

LOCK TABLES `jenis_kamar` WRITE;
/*!40000 ALTER TABLE `jenis_kamar` DISABLE KEYS */;
INSERT INTO `jenis_kamar` VALUES (1,'premium',100000,4,'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'),(2,'deluxe',200000,5,'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'),(3,'Super',230000,8,'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'),(21,'superior',2440000,6,'https://cdn.pixabay.com/photo/2015/02/27/20/07/hotel-room-652722_960_720.jpg');
/*!40000 ALTER TABLE `jenis_kamar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kamar`
--

DROP TABLE IF EXISTS `kamar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kamar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `jenis_kamar` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(4) DEFAULT '0',
  `is_boking` tinyint(4) NOT NULL DEFAULT '0',
  `foto` varchar(100) DEFAULT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kamar_FK` (`jenis_kamar`),
  CONSTRAINT `kamar_FK` FOREIGN KEY (`jenis_kamar`) REFERENCES `jenis_kamar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kamar`
--

LOCK TABLES `kamar` WRITE;
/*!40000 ALTER TABLE `kamar` DISABLE KEYS */;
INSERT INTO `kamar` VALUES (10,'kamar baguws',1,'2022-03-12 15:36:50',0,1,NULL,NULL),(14,'さはら',1,'2022-03-12 15:42:13',0,1,NULL,NULL),(19,'このかわ',2,'2022-04-02 11:51:18',0,1,NULL,NULL),(24,'kamar indah',1,'2022-04-11 11:29:43',0,1,NULL,NULL),(25,'Lt-21',21,'2022-04-13 02:33:07',0,0,NULL,'Kamar super'),(26,'LT-2',1,'2022-04-13 02:33:25',0,0,NULL,'Premium'),(27,'Lt-10',2,'2022-04-13 02:33:46',0,0,NULL,'deluxe'),(28,'Lt-20',21,'2022-04-13 02:34:01',0,0,NULL,'superior'),(29,'Lt-1',3,'2022-04-13 02:40:47',0,0,NULL,'super');
/*!40000 ALTER TABLE `kamar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pemesanan_kamar`
--

DROP TABLE IF EXISTS `pemesanan_kamar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pemesanan_kamar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kamar_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `check_in` datetime DEFAULT NULL,
  `check_out` datetime DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `nomor_pemesanan` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pemesanan_kamar_FK` (`kamar_id`),
  CONSTRAINT `pemesanan_kamar_FK` FOREIGN KEY (`kamar_id`) REFERENCES `kamar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pemesanan_kamar`
--

LOCK TABLES `pemesanan_kamar` WRITE;
/*!40000 ALTER TABLE `pemesanan_kamar` DISABLE KEYS */;
INSERT INTO `pemesanan_kamar` VALUES (11,NULL,'2022-04-08 22:05:02','2022-04-12 22:36:50','2022-04-13 22:36:50',1,'INV-Kmr.2022/4/9-1'),(12,NULL,'2022-04-12 21:01:35','2022-04-13 00:00:00','2022-04-13 00:00:00',4,'INV-Kmr.2022/4/12-1'),(13,NULL,'2022-04-12 21:03:49','2022-04-13 00:00:00','2022-04-14 00:00:00',4,'INV-Kmr.2022/4/13-2'),(14,NULL,'2022-04-12 23:47:35','2022-04-13 00:00:00','2022-04-13 00:00:00',4,'INV-Kmr.2022/4/13-3');
/*!40000 ALTER TABLE `pemesanan_kamar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pemesanan_kamar_detail`
--

DROP TABLE IF EXISTS `pemesanan_kamar_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pemesanan_kamar_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pemesanan_kamar_id` int(11) NOT NULL,
  `kamar_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pemesanan_kamar_detail_FK` (`pemesanan_kamar_id`),
  KEY `pemesanan_kamar_detail_FK_1` (`kamar_id`),
  CONSTRAINT `pemesanan_kamar_detail_FK` FOREIGN KEY (`pemesanan_kamar_id`) REFERENCES `pemesanan_kamar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pemesanan_kamar_detail_FK_1` FOREIGN KEY (`kamar_id`) REFERENCES `kamar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pemesanan_kamar_detail`
--

LOCK TABLES `pemesanan_kamar_detail` WRITE;
/*!40000 ALTER TABLE `pemesanan_kamar_detail` DISABLE KEYS */;
INSERT INTO `pemesanan_kamar_detail` VALUES (3,11,14),(4,11,10),(5,12,19),(6,13,19),(7,14,24);
/*!40000 ALTER TABLE `pemesanan_kamar_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `penomoran_dokumen`
--

DROP TABLE IF EXISTS `penomoran_dokumen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `penomoran_dokumen` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `nomor` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penomoran_dokumen`
--

LOCK TABLES `penomoran_dokumen` WRITE;
/*!40000 ALTER TABLE `penomoran_dokumen` DISABLE KEYS */;
INSERT INTO `penomoran_dokumen` VALUES (1,'INV-Kmr.2022/4/8-1',1,'2022-04-08 06:59:41'),(6,'INV-Kmr.2022/4/8-1',2,'2022-04-08 07:16:20'),(7,'INV-Kmr.2022/4/8-1',3,'2022-04-08 07:19:57'),(8,'INV-Kmr.2022/4/8-1',4,'2022-04-08 07:21:20'),(9,'INV-Kmr.2022/4/8-1',5,'2022-04-08 07:22:16'),(10,'INV-Kmr.2022/4/8-1',6,'2022-04-08 07:23:01'),(11,'INV-Kmr.2022/4/8-7',7,'2022-04-08 07:23:53'),(12,'INV-Kmr.2022/4/8-8',8,'2022-04-08 07:24:38'),(13,'INV-Kmr.2022/4/9-1',1,'2022-04-09 05:05:02'),(14,'INV-Kmr.2022/4/12-1',1,'2022-04-13 04:01:35'),(15,'INV-Kmr.2022/4/13-2',2,'2022-04-13 04:03:49'),(16,'INV-Kmr.2022/4/13-3',3,'2022-04-13 06:47:35');
/*!40000 ALTER TABLE `penomoran_dokumen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services_hotel`
--

DROP TABLE IF EXISTS `services_hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `services_hotel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `keterangan` varchar(100) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_hotel`
--

LOCK TABLES `services_hotel` WRITE;
/*!40000 ALTER TABLE `services_hotel` DISABLE KEYS */;
INSERT INTO `services_hotel` VALUES (5,'Spa','Anda lelah dan cape, datanglah ke sini untuk menghilangkan lelah anda','http://pelatihanspa.com/wp-content/uploads/2020/03/spa-arrangement-with-towel-soap-salt_23-2148268482.jpg'),(6,'Kolam Renang','terdapat fasitas kolam berenang ','https://asset.kompas.com/crops/taTYFXzTW43l4AfJ9lEyyuChJ5U=/0x0:866x577/750x500/data/photo/2020/07/20/5f1554b184ddf.png'),(7,'Breakfast ','menu di pagi hari yang sangat beragam','https://media-cdn.tripadvisor.com/media/photo-s/17/57/7d/0b/our-fluffy-pancakes-with.jpg');
/*!40000 ALTER TABLE `services_hotel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_FK` (`role`),
  CONSTRAINT `users_FK` FOREIGN KEY (`role`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test admin','test@admin.com',1,'$2b$10$caPIezvxkN.mNJFNrZKT9OTku8UKfzHczdK/mcts6s7AnDBO2M3IC'),(4,'test admin','test@user.com',1,'$2b$10$TNlroH6hQFhI5qiThfO6R.cyRBkxzn3AVmimUiYwpo5WbVdz40NPu'),(5,'albedo','anu@gmail.com',1,'$2b$10$I5LTmQHS1f5HjNtRQTPo1uXAE79iaucpXarYSQKIIQ38yKO0W.tBG'),(6,'swe','bru@h.segs',NULL,'$2b$10$ziM44tVwfYdwDIBROEbU6OUvVigneksaEWvxXn7boYPUZeuCRq1Fi'),(7,'abc','asd@asd.com',NULL,'$2b$10$VCsPrkuXCjVdy3GtUwMVYOGHu6gqxHuH/4FNizhrQuQSnrs8vyZxe'),(8,'abc','asda@asd.com',NULL,'$2b$10$aGT/3Mc9Gt3XA7jUTRqSue3AO7XlV0eaZV1XM.XdbiW7wZ7o/GXHC'),(9,'asd','asd@asd.cum',NULL,'$2b$10$YpKO91TJlHOPsKGW1FKPKunzGaG/IYym0drq2/7na2m6wcbq8QtaK'),(10,'anu','as@a.cum',NULL,'$2b$10$S9k7bGk2EXpbGxGHfHj01OjogGbzONX/VF0Ench6kxmsx/v9ILr7e'),(11,'ur mom','mom@mom.my',NULL,'$2b$10$zT4v6ocGluliGA1dyrHgo.WywZ0OV/cXb24b.w/6SsjowFyzfI5Pe'),(12,'anu','anu@anu.anu',NULL,'$2b$10$E00YJ/vaJqpZukbeAjnOzeY93J7kWP/Sd4PR/8bOe2aVgIONObVza'),(13,'anu','anu@role.test',1,'$2b$10$WruaRd3fADPSM6P1TNqZ1OsVI3ErsXBGk4Z50dcsDhotEzdq5M19m');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-07  9:36:48
