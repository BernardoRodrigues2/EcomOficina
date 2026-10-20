-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: db_autofix
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `agendamentos`
--

DROP TABLE IF EXISTS `agendamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamentos` (
  `codAgendamento` int NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `tipoServico` enum('revisao','manutençao','instalaçao') NOT NULL,
  `idCliente` int NOT NULL,
  `idVeiculo` int NOT NULL,
  PRIMARY KEY (`codAgendamento`),
  KEY `idCliente` (`idCliente`),
  KEY `idVeiculo` (`idVeiculo`),
  CONSTRAINT `agendamentos_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`codCliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `agendamentos_ibfk_2` FOREIGN KEY (`idVeiculo`) REFERENCES `veiculos` (`codVeiculo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamentos`
--

LOCK TABLES `agendamentos` WRITE;
/*!40000 ALTER TABLE `agendamentos` DISABLE KEYS */;
INSERT INTO `agendamentos` VALUES (1,'2026-10-20','08:10:00','revisao',1,1),(2,'2026-10-20','08:20:00','manutençao',3,3),(3,'2026-10-20','08:50:00','instalaçao',3,3);
/*!40000 ALTER TABLE `agendamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `codCliente` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `cpf` varchar(255) NOT NULL,
  `endereco` varchar(50) NOT NULL,
  `telefone` varchar(50) NOT NULL,
  PRIMARY KEY (`codCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Carlos','carlos@gmail.com','U2FsdGVkX1/lMB1XiVmD+H2rGCa+01sTDJ1UaCK8teA=','U2FsdGVkX1+kykAWwUcHpeQvPjpk429dzpTwsP/q5ZY=','Rua Teste, 0','48999998888'),(2,'Ana','ana@gmail.com','U2FsdGVkX1+TnZU5Ry+nz38JiW+57I573DUCFT5p110=','U2FsdGVkX1/UV9+6CGymXw8fraBu6qfPu5VE6HAzrEM=','Av. Brasil, 456','48988887777'),(3,'RobertoUpd','robertoUpd@gmail.com','U2FsdGVkX182eMH9ZmGag23C8e7F3I+8XhkUC4Er37E=','U2FsdGVkX193afeeero041dR6TqZM3zhlKPcBVxbdqA=','Rua Central, 789','48977776666');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veiculos`
--

DROP TABLE IF EXISTS `veiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veiculos` (
  `codVeiculo` int NOT NULL AUTO_INCREMENT,
  `modelo` varchar(20) NOT NULL,
  `marca` varchar(20) NOT NULL,
  `placa` varchar(30) NOT NULL,
  `codRastreio` varchar(255) NOT NULL,
  `idCliente` int NOT NULL,
  PRIMARY KEY (`codVeiculo`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `veiculos_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`codCliente`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veiculos`
--

LOCK TABLES `veiculos` WRITE;
/*!40000 ALTER TABLE `veiculos` DISABLE KEYS */;
INSERT INTO `veiculos` VALUES (1,'Dolphin mini','Byd','Xyz0B14','U2FsdGVkX1+Y3taL0c5M32kDAFFd80Z4FuXpCGYO8qU=',1),(2,'Tesla model Y','Tesla','Xjs0A15','U2FsdGVkX19V6+SmfSjt1lIcc+qLh7UDPfgkGB5cny0=',2),(3,'Honda Civic','Honda','Llm0P25','U2FsdGVkX19zShEIRTkh/R5Y5XfB/FfKqqHDAnFhOIU=',3);
/*!40000 ALTER TABLE `veiculos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-20  8:14:50
