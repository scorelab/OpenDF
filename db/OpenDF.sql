-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2014 at 07:00 PM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `opendf`
--

-- --------------------------------------------------------

--
-- Table structure for table `badfile`
--

CREATE TABLE IF NOT EXISTS `badfile` (
  `idBadFile` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `signature` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`idBadFile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `browser`
--

CREATE TABLE IF NOT EXISTS `browser` (
  `idBrowser` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idBrowser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `browserhistory`
--

CREATE TABLE IF NOT EXISTS `browserhistory` (
  `idBrowserHistory` int(11) NOT NULL,
  `URL` varchar(450) DEFAULT NULL,
  `Browser_idBrowser` int(11) NOT NULL,
  PRIMARY KEY (`idBrowserHistory`),
  KEY `fk_BrowserHistory_Browser1_idx` (`Browser_idBrowser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `browsersavedpassword`
--

CREATE TABLE IF NOT EXISTS `browsersavedpassword` (
  `idBrowserSavedPassword` int(11) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `Browser_idBrowser` int(11) NOT NULL,
  `DiskImage_idDiskImage` int(11) NOT NULL,
  PRIMARY KEY (`idBrowserSavedPassword`),
  KEY `fk_BrowserData_Browser1_idx` (`Browser_idBrowser`),
  KEY `fk_BrowserSavedPassword_DiskImage1_idx` (`DiskImage_idDiskImage`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `directory`
--

CREATE TABLE IF NOT EXISTS `directory` (
  `idDirectory` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `path` varchar(500) DEFAULT NULL,
  `DiskImage_idDiskImage` int(11) NOT NULL,
  `parentDirectory` int(11) NOT NULL,
  PRIMARY KEY (`idDirectory`),
  KEY `fk_Directory_DiskImage1_idx` (`DiskImage_idDiskImage`),
  KEY `fk_Directory_Directory1_idx` (`parentDirectory`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `diskimage`
--

CREATE TABLE IF NOT EXISTS `diskimage` (
  `idDiskImage` int(11) NOT NULL,
  `Project_idProject` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idDiskImage`),
  KEY `fk_DiskImage_Case1_idx` (`Project_idProject`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE IF NOT EXISTS `file` (
  `idFile` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `size` float DEFAULT NULL,
  `MIMEtype` varchar(45) DEFAULT NULL,
  `createdDate` datetime DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `AccessDate` datetime DEFAULT NULL,
  `parentDirectory` int(11) NOT NULL,
  PRIMARY KEY (`idFile`),
  KEY `fk_File_Directory1_idx` (`parentDirectory`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `file_has_badfile`
--

CREATE TABLE IF NOT EXISTS `file_has_badfile` (
  `File_idFile` int(11) NOT NULL,
  `BadFile_idBadFile` int(11) NOT NULL,
  PRIMARY KEY (`File_idFile`,`BadFile_idBadFile`),
  KEY `fk_File_has_BadFile_BadFile1_idx` (`BadFile_idBadFile`),
  KEY `fk_File_has_BadFile_File1_idx` (`File_idFile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `file_has_knowface`
--

CREATE TABLE IF NOT EXISTS `file_has_knowface` (
  `File_idFile` int(11) NOT NULL,
  `KnowFace_idKnowFace` int(11) NOT NULL,
  PRIMARY KEY (`File_idFile`,`KnowFace_idKnowFace`),
  KEY `fk_File_has_KnowFace_KnowFace1_idx` (`KnowFace_idKnowFace`),
  KEY `fk_File_has_KnowFace_File1_idx` (`File_idFile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `knowface`
--

CREATE TABLE IF NOT EXISTS `knowface` (
  `idKnowFace` int(11) NOT NULL,
  `path` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(450) DEFAULT NULL,
  PRIMARY KEY (`idKnowFace`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `idProject` int(11) NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`idProject`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`idProject`, `name`, `description`, `status`, `created_date`) VALUES
(1, ' A Scandal In Belgravia             ', 'Compromising photographs of royal family', NULL, NULL),
(2, 'Study in Pink', 'A case about a pink color phone', 1, '2014-10-31 18:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE IF NOT EXISTS `task` (
  `idTask` int(11) NOT NULL,
  `Project_idProject` int(11) NOT NULL,
  `DiskImage_idDiskImage` int(11) NOT NULL,
  PRIMARY KEY (`idTask`),
  KEY `fk_Task_Case_idx` (`Project_idProject`),
  KEY `fk_Task_DiskImage1_idx` (`DiskImage_idDiskImage`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `name` varchar(300) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`idUser`, `username`, `password`, `email`, `name`, `avatar`) VALUES
(1, 'agentmilindu', '12345678', 'agentmilindu@gmail.com', 'Milindu Sanoj Kumarage', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_has_project`
--

CREATE TABLE IF NOT EXISTS `user_has_project` (
  `User_idUser` int(11) NOT NULL,
  `Project_idProject` int(11) NOT NULL,
  PRIMARY KEY (`User_idUser`,`Project_idProject`),
  KEY `fk_User_has_Case_Case1_idx` (`Project_idProject`),
  KEY `fk_User_has_Case_User1_idx` (`User_idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_has_project`
--

INSERT INTO `user_has_project` (`User_idUser`, `Project_idProject`) VALUES
(1, 1),
(1, 2);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `browserhistory`
--
ALTER TABLE `browserhistory`
  ADD CONSTRAINT `fk_BrowserHistory_Browser1` FOREIGN KEY (`Browser_idBrowser`) REFERENCES `browser` (`idBrowser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `browsersavedpassword`
--
ALTER TABLE `browsersavedpassword`
  ADD CONSTRAINT `fk_BrowserData_Browser1` FOREIGN KEY (`Browser_idBrowser`) REFERENCES `browser` (`idBrowser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_BrowserSavedPassword_DiskImage1` FOREIGN KEY (`DiskImage_idDiskImage`) REFERENCES `diskimage` (`idDiskImage`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `directory`
--
ALTER TABLE `directory`
  ADD CONSTRAINT `fk_Directory_Directory1` FOREIGN KEY (`parentDirectory`) REFERENCES `directory` (`idDirectory`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Directory_DiskImage1` FOREIGN KEY (`DiskImage_idDiskImage`) REFERENCES `diskimage` (`idDiskImage`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `diskimage`
--
ALTER TABLE `diskimage`
  ADD CONSTRAINT `fk_DiskImage_Case1` FOREIGN KEY (`Project_idProject`) REFERENCES `project` (`idProject`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `file`
--
ALTER TABLE `file`
  ADD CONSTRAINT `fk_File_Directory1` FOREIGN KEY (`parentDirectory`) REFERENCES `directory` (`idDirectory`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `file_has_badfile`
--
ALTER TABLE `file_has_badfile`
  ADD CONSTRAINT `fk_File_has_BadFile_BadFile1` FOREIGN KEY (`BadFile_idBadFile`) REFERENCES `badfile` (`idBadFile`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_File_has_BadFile_File1` FOREIGN KEY (`File_idFile`) REFERENCES `file` (`idFile`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `file_has_knowface`
--
ALTER TABLE `file_has_knowface`
  ADD CONSTRAINT `fk_File_has_KnowFace_File1` FOREIGN KEY (`File_idFile`) REFERENCES `file` (`idFile`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_File_has_KnowFace_KnowFace1` FOREIGN KEY (`KnowFace_idKnowFace`) REFERENCES `knowface` (`idKnowFace`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `fk_Task_Case` FOREIGN KEY (`Project_idProject`) REFERENCES `project` (`idProject`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Task_DiskImage1` FOREIGN KEY (`DiskImage_idDiskImage`) REFERENCES `diskimage` (`idDiskImage`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user_has_project`
--
ALTER TABLE `user_has_project`
  ADD CONSTRAINT `fk_User_has_Case_Case1` FOREIGN KEY (`Project_idProject`) REFERENCES `project` (`idProject`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_User_has_Case_User1` FOREIGN KEY (`User_idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
