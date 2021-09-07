-- MariaDB dump 10.19  Distrib 10.5.11-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: player_backend
-- ------------------------------------------------------
-- Server version	10.5.11-MariaDB-1:10.5.11+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `albums` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `artist_id` bigint(20) unsigned NOT NULL,
  `release_date` date DEFAULT NULL,
  `image_path` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `albums_artist_id_foreign` (`artist_id`),
  KEY `albums_name_index` (`name`),
  CONSTRAINT `albums_artist_id_foreign` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` VALUES (1,'PSYCHODRAMA',1,NULL,NULL,'2021-04-19 15:49:10','2021-04-19 15:49:10'),(2,'Hoodies All Summer',5,NULL,NULL,'2021-04-19 15:49:10','2021-04-19 15:49:10'),(3,'Lighter (feat. KSI)',11,NULL,NULL,'2021-04-19 15:49:10','2021-04-19 15:49:10'),(4,'(What\'s The Story) Morning Glory?',13,NULL,NULL,'2021-04-19 15:49:10','2021-04-19 15:49:10');
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artists` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_path` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `artists_name_index` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

LOCK TABLES `artists` WRITE;
/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES (1,'Dave',NULL,'2021-04-19 15:49:10','2021-04-19 15:49:10'),(2,'J Hus',NULL,'2021-04-19 15:49:10','2021-04-19 15:49:10'),(3,'Ruelle',NULL,'2021-04-19 15:49:10','2021-04-19 15:49:10'),(4,'Burna Boy',NULL,'2021-04-19 15:49:10','2021-04-19 15:49:10'),(5,'Kano',NULL,'2021-04-19 15:49:10','2021-04-19 15:49:10'),(6,'Popcaan',NULL,'2021-04-19 15:49:10','2021-04-19 15:49:10'),(7,'D Double E',NULL,'2021-04-19 15:49:10','2021-04-19 15:49:10'),(8,'Ghetts',NULL,'2021-04-19 15:49:10','2021-04-19 15:49:10'),(9,'Lil Silva',NULL,'2021-04-19 15:49:10','2021-04-19 15:49:10'),(10,'Kojo Funds',NULL,'2021-04-19 15:49:10','2021-04-19 15:49:10'),(11,'Nathan Dawe',NULL,'2021-04-19 15:49:10','2021-04-19 15:49:10'),(12,'KSI',NULL,'2021-04-19 15:49:10','2021-04-19 15:49:10'),(13,'Oasis',NULL,'2021-04-19 15:49:10','2021-04-19 15:49:10');
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2021_04_13_095055_create_songs_table',1),(5,'2021_04_13_095056_create_albums_table',1),(6,'2021_04_13_095057_create_artists_table',1),(7,'2021_04_13_095058_create_playlists_table',1),(8,'2021_04_13_095059_create_playlist_song_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist_song`
--

DROP TABLE IF EXISTS `playlist_song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playlist_song` (
  `playlist_id` bigint(20) unsigned NOT NULL,
  `song_id` bigint(20) unsigned NOT NULL,
  KEY `playlist_song_playlist_id_foreign` (`playlist_id`),
  KEY `playlist_song_song_id_foreign` (`song_id`),
  CONSTRAINT `playlist_song_playlist_id_foreign` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `playlist_song_song_id_foreign` FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist_song`
--

LOCK TABLES `playlist_song` WRITE;
/*!40000 ALTER TABLE `playlist_song` DISABLE KEYS */;
INSERT INTO `playlist_song` VALUES (1,26),(1,18);
/*!40000 ALTER TABLE `playlist_song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlists`
--

DROP TABLE IF EXISTS `playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playlists` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_path` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `playlists_name_index` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists`
--

LOCK TABLES `playlists` WRITE;
/*!40000 ALTER TABLE `playlists` DISABLE KEYS */;
INSERT INTO `playlists` VALUES (1,'Sams playlist',NULL,'2021-05-21 15:55:38','2021-05-21 15:55:38');
/*!40000 ALTER TABLE `playlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `songs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `album_id` bigint(20) unsigned NOT NULL,
  `artist_id` bigint(20) unsigned DEFAULT NULL,
  `track_no` int(10) unsigned DEFAULT NULL,
  `runtime` int(10) unsigned DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `song_path` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `songs_album_id_foreign` (`album_id`),
  KEY `songs_artist_id_foreign` (`artist_id`),
  KEY `songs_title_index` (`title`),
  CONSTRAINT `songs_album_id_foreign` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `songs_artist_id_foreign` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (1,'Black',1,1,3,NULL,NULL,'Dave - Psychodrama (2019)/Dave - Black.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(2,'Disaster (feat. J Hus)',1,1,6,NULL,NULL,'Dave - Psychodrama (2019)/Dave - Disaster (feat. J Hus).mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(3,'Drama',1,1,11,NULL,NULL,'Dave - Psychodrama (2019)/Dave - Drama.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(4,'Environment',1,1,8,NULL,NULL,'Dave - Psychodrama (2019)/Dave - Environment.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(5,'Lesley (feat. Ruelle)',1,1,9,NULL,NULL,'Dave - Psychodrama (2019)/Dave - Lesley (feat. Ruelle).mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(6,'Location (feat. Burna Boy)',1,1,5,NULL,NULL,'Dave - Psychodrama (2019)/Dave - Location (feat. Burna Boy).mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(7,'Psycho',1,1,1,NULL,NULL,'Dave - Psychodrama (2019)/Dave - Psycho.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(8,'Purple Heart',1,1,4,NULL,NULL,'Dave - Psychodrama (2019)/Dave - Purple Heart.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(9,'Screwface Capital',1,1,7,NULL,NULL,'Dave - Psychodrama (2019)/Dave - Screwface Capital.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(10,'Streatham',1,1,2,NULL,NULL,'Dave - Psychodrama (2019)/Dave - Streatham.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(11,'Voices',1,1,10,NULL,NULL,'Dave - Psychodrama (2019)/Dave - Voices.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(12,'Bang Down Your Door',2,5,7,NULL,NULL,'Kano - Hoodies All Summer (2019)/Kano - Bang Down Your Door.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(13,'Can\'t Hold We Down (feat. Popcaan)',2,5,5,NULL,NULL,'Kano - Hoodies All Summer (2019)/Kano - Can\'t Hold We Down (feat. Popcaan).mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(14,'Class of Deja (feat. D Double E & Ghetts)',2,5,9,NULL,NULL,'Kano - Hoodies All Summer (2019)/Kano - Class of Deja (feat. D Double E & Ghetts).mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(15,'Free Years Later',2,5,1,NULL,NULL,'Kano - Hoodies All Summer (2019)/Kano - Free Years Later.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(16,'Good Youtes Walk Amongst Evil',2,5,2,NULL,NULL,'Kano - Hoodies All Summer (2019)/Kano - Good Youtes Walk Amongst Evil.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(17,'Got My Brandy, Got My Beats (feat. Lil Silva)',2,5,8,NULL,NULL,'Kano - Hoodies All Summer (2019)/Kano - Got My Brandy, Got My Beats (feat. Lil Silva).mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(18,'Pan-Fried (feat. Kojo Funds)',2,5,4,NULL,NULL,'Kano - Hoodies All Summer (2019)/Kano - Pan-Fried (feat. Kojo Funds).mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(19,'SYM',2,5,10,NULL,NULL,'Kano - Hoodies All Summer (2019)/Kano - SYM.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(20,'Teardrops',2,5,6,NULL,NULL,'Kano - Hoodies All Summer (2019)/Kano - Teardrops.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(21,'Trouble',2,5,3,NULL,NULL,'Kano - Hoodies All Summer (2019)/Kano - Trouble.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(22,'Lighter (feat. KSI)',3,11,1,NULL,NULL,'Nathan Dawe - Lighter (feat. KSI) (Sample).mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(23,'Lighter (feat. KSI)',3,11,1,NULL,NULL,'Nathan Dawe - Lighter (feat. KSI).mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(24,'Cast No Shadow',4,13,8,NULL,NULL,'Oasis - Whats The Story, Morning Glory (1995)/Oasis - Cast No Shadow.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(25,'Champagne Supernova',4,13,12,NULL,NULL,'Oasis - Whats The Story, Morning Glory (1995)/Oasis - Champagne Supernova.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(26,'Don\'t Look Back In Anger',4,13,4,NULL,NULL,'Oasis - Whats The Story, Morning Glory (1995)/Oasis - Don\'t Look Back In Anger.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(27,'Hello',4,13,1,NULL,NULL,'Oasis - Whats The Story, Morning Glory (1995)/Oasis - Hello.mp3','2021-04-19 15:49:10','2021-04-19 15:49:10'),(28,'Hey Now!',4,13,5,NULL,NULL,'Oasis - Whats The Story, Morning Glory (1995)/Oasis - Hey Now!.mp3','2021-04-19 15:49:11','2021-04-19 15:49:11'),(29,'Morning Glory',4,13,10,NULL,NULL,'Oasis - Whats The Story, Morning Glory (1995)/Oasis - Morning Glory.mp3','2021-04-19 15:49:11','2021-04-19 15:49:11'),(30,'Roll With It',4,13,2,NULL,NULL,'Oasis - Whats The Story, Morning Glory (1995)/Oasis - Roll With It.mp3','2021-04-19 15:49:11','2021-04-19 15:49:11'),(31,'She\'s Electric',4,13,9,NULL,NULL,'Oasis - Whats The Story, Morning Glory (1995)/Oasis - She\'s Electric.mp3','2021-04-19 15:49:11','2021-04-19 15:49:11'),(32,'Some Might Say',4,13,7,NULL,NULL,'Oasis - Whats The Story, Morning Glory (1995)/Oasis - Some Might Say.mp3','2021-04-19 15:49:11','2021-04-19 15:49:11'),(33,'The Swamp Song - Version 1',4,13,6,NULL,NULL,'Oasis - Whats The Story, Morning Glory (1995)/Oasis - The Swamp Song - Version 1.mp3','2021-04-19 15:49:11','2021-04-19 15:49:11'),(34,'The Swamp Song - Version 2',4,13,11,NULL,NULL,'Oasis - Whats The Story, Morning Glory (1995)/Oasis - The Swamp Song - Version 2.mp3','2021-04-19 15:49:11','2021-04-19 15:49:11'),(35,'Wonderwall',4,13,3,NULL,NULL,'Oasis - Whats The Story, Morning Glory (1995)/Oasis - Wonderwall.mp3','2021-04-19 15:49:11','2021-04-19 15:49:11');
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dump completed on 2021-07-08 17:46:03
