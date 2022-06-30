CREATE DATABASE  IF NOT EXISTS `machimachi` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `machimachi`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: machimachi
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id_cart` int NOT NULL AUTO_INCREMENT,
  `coupon` varchar(45) DEFAULT NULL,
  `sub_total` int NOT NULL,
  `total` int NOT NULL,
  `id_status` int NOT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id_cart`),
  KEY `status_cart_idx` (`id_status`),
  KEY `cart_user_idx` (`id_user`),
  CONSTRAINT `cart_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  CONSTRAINT `status_cart` FOREIGN KEY (`id_status`) REFERENCES `status` (`id_status`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,NULL,4300,4300,1,2),(2,NULL,5000,5000,1,3),(3,NULL,4400,4400,1,4),(4,NULL,2500,2500,2,4);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `details_cart`
--

DROP TABLE IF EXISTS `details_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `details_cart` (
  `id_details_cart` int NOT NULL AUTO_INCREMENT,
  `id_cart` int NOT NULL,
  `id_product` int NOT NULL,
  `quantity` int NOT NULL,
  `sub_total` int NOT NULL,
  PRIMARY KEY (`id_details_cart`),
  KEY `product_details_cart_idx` (`id_product`),
  KEY `cart_details_cart_idx` (`id_cart`),
  CONSTRAINT `cart_details_cart` FOREIGN KEY (`id_cart`) REFERENCES `carts` (`id_cart`),
  CONSTRAINT `product_details_cart` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `details_cart`
--

LOCK TABLES `details_cart` WRITE;
/*!40000 ALTER TABLE `details_cart` DISABLE KEYS */;
INSERT INTO `details_cart` VALUES (1,1,11,1,2500),(2,1,9,1,1800),(3,2,11,2,5000),(4,3,4,1,2200),(5,3,5,1,2200),(6,4,11,1,2500);
/*!40000 ALTER TABLE `details_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id_product` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `price` int NOT NULL,
  `description` varchar(300) NOT NULL,
  `img` varchar(300) NOT NULL,
  `gender` varchar(45) NOT NULL,
  `discount` float DEFAULT NULL,
  PRIMARY KEY (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Sweater Bowie',4500,'Sweater tejido a mano','/images/IMG_0503.jpg','niñas',0.05),(2,'Chaleco Freddie',4500,'Chaleco tejido a mano','/images/IMG_0501.jpg','niños',0),(3,'Gorrito frutilla',2200,'Gorrito tejido a mano','/images/IMG_gorrito_Frutilla.jpg','niñas',0),(4,'Gorrito cebra',2200,'Gorrito tejido a mano','/images/IMG_gorrito_Cebra.jpg','niños',0),(5,'Chaleco bosque',4500,'Chaleco tejido a mano','/images/IMG_0498.jpg','niños',0.2),(6,'Gorrito tricolor',2200,'Gorrito tejido a mano','/images/IMG_0502.jpg','niños',0),(7,'Sweater jirafa',4500,'Sweater tejido a mano','/images/IMG_0495.jpg','niñas',0.1),(8,'Gorrito militar',2200,'Gorrito tejido a mano','/images/IMG_0505.jpg','niños',0.4),(9,'Polainas suerte',1800,'Cruzando los dedos una vez más','/images/polainas-tejidas-para-niñas-de-colores.jpg','niñas',0),(10,'Combo miñons',4500,'Gorrito, guantes y bufandas de miñons','/images/product-img1652653924113.jpg','niñas',0.6),(11,'Gorrito mickey mouse',2500,'Gorrito tejido a mano de mickey','/images/c6bd60471982a0155c924bdc6b7682fa.jpg','niños',0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_size`
--

DROP TABLE IF EXISTS `products_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_size` (
  `id_products_size` int NOT NULL AUTO_INCREMENT,
  `stock` int NOT NULL,
  `id_size` int NOT NULL,
  `id_product` int NOT NULL,
  PRIMARY KEY (`id_products_size`),
  KEY `products_idx` (`id_product`),
  KEY `size_product_size_idx` (`id_size`),
  CONSTRAINT `product_product_size` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`),
  CONSTRAINT `size_product_size` FOREIGN KEY (`id_size`) REFERENCES `sizes` (`id_size`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_size`
--

LOCK TABLES `products_size` WRITE;
/*!40000 ALTER TABLE `products_size` DISABLE KEYS */;
INSERT INTO `products_size` VALUES (1,5,1,1),(2,5,2,1),(3,5,3,1),(4,5,4,1),(5,5,5,1),(6,5,6,1),(7,5,1,2),(8,5,2,2),(9,5,3,2),(10,5,4,2),(11,5,5,2),(12,5,6,2),(13,5,1,3),(14,5,2,3),(15,5,3,3),(16,5,4,3),(17,5,5,3),(18,5,6,3),(19,5,1,4),(20,5,2,4),(21,5,3,4),(22,5,4,4),(23,5,5,4),(24,5,6,4),(25,5,1,5),(26,5,2,5),(27,5,3,5),(28,5,4,5),(29,5,5,5),(30,5,6,5),(31,5,1,6),(32,5,2,6),(33,5,3,6),(34,5,4,6),(35,5,5,6),(36,5,6,6),(37,5,1,7),(38,5,2,7),(39,5,3,7),(40,5,4,7),(41,5,5,7),(42,5,6,7),(43,5,1,8),(44,5,2,8),(45,5,3,8),(46,5,4,8),(47,5,5,8),(48,5,6,8),(49,5,1,9),(50,5,2,9),(51,5,3,9),(52,5,4,9),(53,5,5,9),(54,5,6,9),(55,5,1,10),(56,5,2,10),(57,5,3,10),(58,5,4,10),(59,5,5,10),(60,5,6,10),(61,5,1,11),(62,5,2,11),(63,5,3,11),(64,5,4,11),(65,5,5,11),(66,5,6,11);
/*!40000 ALTER TABLE `products_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `id_size` int NOT NULL AUTO_INCREMENT,
  `description` varchar(3) NOT NULL,
  PRIMARY KEY (`id_size`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'XS'),(2,'S'),(3,'M'),(4,'L'),(5,'XL'),(6,'XXL');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id_status` int NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  PRIMARY KEY (`id_status`),
  UNIQUE KEY `description_UNIQUE` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Completa'),(2,'Incompleta');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_users`
--

DROP TABLE IF EXISTS `type_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_users` (
  `id_type_users` int NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  PRIMARY KEY (`id_type_users`),
  UNIQUE KEY `description_UNIQUE` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_users`
--

LOCK TABLES `type_users` WRITE;
/*!40000 ALTER TABLE `type_users` DISABLE KEYS */;
INSERT INTO `type_users` VALUES (1,'admin'),(2,'cliente');
/*!40000 ALTER TABLE `type_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `img` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `password` text NOT NULL,
  `id_type_user` int NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `user_type_user_idx` (`id_type_user`),
  CONSTRAINT `user_type_user` FOREIGN KEY (`id_type_user`) REFERENCES `type_users` (`id_type_users`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','admin@admin.com','/images/users/userImg1655402343027.png','12345678','$2a$10$kEHftcVY0EmlSUegNFnOxOHhp4d4OE6wEUq0z5phQ4RklLnuL17NC',1), (2,'Fernando','Veliz','fernando.e.veliz@gmail.com','/images/users/userImg1655400230542.png','01130280788','$2a$10$0qJivWWzHI0mnA1rFBrMhOFZeNIxfweAKPYdGlyWmQ/nDM6X6mCrq',2),(3,'Mariano','Pettinati','mariano@mail.com','/images/users/userImg1655401365022.png','1231123211','$2a$10$87EoVmD6xz2QtC07pJDxdeKDN06FyGfJBr9JUuBf0GAhbsX62McqW',2),(4,'Valeria','Moncada','vale@unmail.com','/images/users/userImg1655401444538.png','123123123123','$2a$10$Tkug10rQ4z.bZRRPtD6cdeSPF1WJC37Mk1r6lpSsu7Nj2cu6V4j9a',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'machimachi'
--

--
-- Dumping routines for database 'machimachi'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-23  8:22:59
