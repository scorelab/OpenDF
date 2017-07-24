SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `OpenDF`
--

-- --------------------------------------------------------

--
-- Table structure for table `BadFile`
--

CREATE TABLE IF NOT EXISTS `BadFile` (
  `idBadFile` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `signature` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Browser`
--

CREATE TABLE IF NOT EXISTS `Browser` (
`idBrowser` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `BrowserHistory`
--

CREATE TABLE IF NOT EXISTS `BrowserHistory` (
`idBrowserHistory` int(11) NOT NULL,
  `URL` varchar(450) DEFAULT NULL,
  `Browser_idBrowser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `diskimage`
--

CREATE TABLE IF NOT EXISTS `diskimage` (
`idDiskImage` int(11) NOT NULL,
  `Project_idProject` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `type` varchar(5) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `path` varchar(300) DEFAULT NULL,
  `createdDate` date DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=77 ;

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE IF NOT EXISTS `file` (
`idFile` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `size` float DEFAULT NULL,
  `MIMEtype` varchar(45) DEFAULT NULL,
  `createdDate` datetime DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `AccessDate` datetime DEFAULT NULL,
  `diskimage_idDiskImage` int(11) NOT NULL,
  `parent_idFile` int(11) DEFAULT NULL,
  `md5hash` varchar(40) DEFAULT NULL,
  `extension` varchar(10) DEFAULT NULL,
  `isVirtual` int(11) DEFAULT NULL,
  `isDir` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=53 ;

-- --------------------------------------------------------

--
-- Table structure for table `File_has_BadFile`
--

CREATE TABLE IF NOT EXISTS `File_has_BadFile` (
  `File_idFile` int(11) NOT NULL,
  `BadFile_idBadFile` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `File_has_KnowFace`
--

CREATE TABLE IF NOT EXISTS `File_has_KnowFace` (
  `File_idFile` int(11) NOT NULL,
  `KnowFace_idKnowFace` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `KnowFace`
--

CREATE TABLE IF NOT EXISTS `KnowFace` (
  `idKnowFace` int(11) NOT NULL,
  `path` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(450) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Log`
--

CREATE TABLE IF NOT EXISTS `Log` (
`idLog` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `idProject` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- Table structure for table `Note`
--

CREATE TABLE IF NOT EXISTS `Note` (
`idNote` int(11) NOT NULL,
  `idProject` int(11) NOT NULL,
  `idFile` int(11) NOT NULL,
  `description` varchar(500) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `Project`
--

CREATE TABLE IF NOT EXISTS `Project` (
`idProject` int(11) NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=54 ;

-- --------------------------------------------------------

--
-- Table structure for table `Report`
--

CREATE TABLE IF NOT EXISTS `Report` (
`idReport` int(11) NOT NULL,
  `idProject` int(11) NOT NULL,
  `title` varchar(400) NOT NULL,
  `path` varchar(400) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `Task`
--

CREATE TABLE IF NOT EXISTS `Task` (
`idTask` int(11) NOT NULL,
  `Project_idProject` int(11) NOT NULL,
  `DiskImage_idDiskImage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE IF NOT EXISTS `User` (
`idUser` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `name` varchar(300) DEFAULT NULL,
  `avatar` varchar(500) DEFAULT 'img/user.jpg',
  `level` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Table structure for table `user_has_project`
--

CREATE TABLE IF NOT EXISTS `user_has_project` (
  `User_idUser` int(11) NOT NULL,
  `Project_idProject` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `BadFile`
--
ALTER TABLE `BadFile`
 ADD PRIMARY KEY (`idBadFile`);

--
-- Indexes for table `Browser`
--
ALTER TABLE `Browser`
 ADD PRIMARY KEY (`idBrowser`);

--
-- Indexes for table `BrowserHistory`
--
ALTER TABLE `BrowserHistory`
 ADD PRIMARY KEY (`idBrowserHistory`), ADD KEY `fk_BrowserHistory_Browser1_idx` (`Browser_idBrowser`);

--
-- Indexes for table `diskimage`
--
ALTER TABLE `diskimage`
 ADD PRIMARY KEY (`idDiskImage`), ADD KEY `fk_DiskImage_Case1_idx` (`Project_idProject`);

--
-- Indexes for table `file`
--
ALTER TABLE `file`
 ADD PRIMARY KEY (`idFile`), ADD KEY `fk_File_diskimage1_idx` (`diskimage_idDiskImage`);

--
-- Indexes for table `File_has_BadFile`
--
ALTER TABLE `File_has_BadFile`
 ADD PRIMARY KEY (`File_idFile`,`BadFile_idBadFile`), ADD KEY `fk_File_has_BadFile_BadFile1_idx` (`BadFile_idBadFile`), ADD KEY `fk_File_has_BadFile_File1_idx` (`File_idFile`);

--
-- Indexes for table `File_has_KnowFace`
--
ALTER TABLE `File_has_KnowFace`
 ADD PRIMARY KEY (`File_idFile`,`KnowFace_idKnowFace`), ADD KEY `fk_File_has_KnowFace_KnowFace1_idx` (`KnowFace_idKnowFace`), ADD KEY `fk_File_has_KnowFace_File1_idx` (`File_idFile`);

--
-- Indexes for table `KnowFace`
--
ALTER TABLE `KnowFace`
 ADD PRIMARY KEY (`idKnowFace`);

--
-- Indexes for table `Log`
--
ALTER TABLE `Log`
 ADD PRIMARY KEY (`idLog`);

--
-- Indexes for table `Note`
--
ALTER TABLE `Note`
 ADD PRIMARY KEY (`idNote`);

--
-- Indexes for table `Project`
--
ALTER TABLE `Project`
 ADD PRIMARY KEY (`idProject`);

--
-- Indexes for table `Report`
--
ALTER TABLE `Report`
 ADD PRIMARY KEY (`idReport`);

--
-- Indexes for table `Task`
--
ALTER TABLE `Task`
 ADD PRIMARY KEY (`idTask`), ADD KEY `fk_Task_Case_idx` (`Project_idProject`), ADD KEY `fk_Task_DiskImage1_idx` (`DiskImage_idDiskImage`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
 ADD PRIMARY KEY (`idUser`);

--
-- Indexes for table `user_has_project`
--
ALTER TABLE `user_has_project`
 ADD PRIMARY KEY (`User_idUser`,`Project_idProject`), ADD KEY `fk_User_has_Case_Case1_idx` (`Project_idProject`), ADD KEY `fk_User_has_Case_User1_idx` (`User_idUser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Browser`
--
ALTER TABLE `Browser`
MODIFY `idBrowser` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `BrowserHistory`
--
ALTER TABLE `BrowserHistory`
MODIFY `idBrowserHistory` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `diskimage`
--
ALTER TABLE `diskimage`
MODIFY `idDiskImage` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=77;
--
-- AUTO_INCREMENT for table `file`
--
ALTER TABLE `file`
MODIFY `idFile` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=53;
--
-- AUTO_INCREMENT for table `Log`
--
ALTER TABLE `Log`
MODIFY `idLog` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `Note`
--
ALTER TABLE `Note`
MODIFY `idNote` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `Project`
--
ALTER TABLE `Project`
MODIFY `idProject` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=54;
--
-- AUTO_INCREMENT for table `Report`
--
ALTER TABLE `Report`
MODIFY `idReport` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `Task`
--
ALTER TABLE `Task`
MODIFY `idTask` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
