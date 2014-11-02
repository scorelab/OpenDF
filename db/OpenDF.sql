SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `OpenDF` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `OpenDF` ;

-- -----------------------------------------------------
-- Table `OpenDF`.`User`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `OpenDF`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT ,
  `username` VARCHAR(100) NULL ,
  `password` VARCHAR(100) NULL ,
  `email` VARCHAR(200) NULL ,
  `name` VARCHAR(300) NULL ,
  `avatar` VARCHAR(500) NULL ,
  PRIMARY KEY (`idUser`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDF`.`Project`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `OpenDF`.`Project` (
  `idProject` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(60) NULL ,
  `description` VARCHAR(300) NULL ,
  `status` INT NULL ,
  `created_date` TIMESTAMP NULL ,
  PRIMARY KEY (`idProject`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDF`.`DiskImage`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `OpenDF`.`DiskImage` (
  `idDiskImage` INT NOT NULL AUTO_INCREMENT ,
  `Project_idProject` INT NOT NULL ,
  `name` VARCHAR(45) NULL ,
  PRIMARY KEY (`idDiskImage`) ,
  INDEX `fk_DiskImage_Case1_idx` (`Project_idProject` ASC) ,
  CONSTRAINT `fk_DiskImage_Case1`
    FOREIGN KEY (`Project_idProject` )
    REFERENCES `OpenDF`.`Project` (`idProject` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDF`.`Task`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `OpenDF`.`Task` (
  `idTask` INT NOT NULL AUTO_INCREMENT ,
  `Project_idProject` INT NOT NULL ,
  `DiskImage_idDiskImage` INT NOT NULL ,
  PRIMARY KEY (`idTask`) ,
  INDEX `fk_Task_Case_idx` (`Project_idProject` ASC) ,
  INDEX `fk_Task_DiskImage1_idx` (`DiskImage_idDiskImage` ASC) ,
  CONSTRAINT `fk_Task_Case`
    FOREIGN KEY (`Project_idProject` )
    REFERENCES `OpenDF`.`Project` (`idProject` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Task_DiskImage1`
    FOREIGN KEY (`DiskImage_idDiskImage` )
    REFERENCES `OpenDF`.`DiskImage` (`idDiskImage` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDF`.`User_has_Project`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `OpenDF`.`User_has_Project` (
  `User_idUser` INT NOT NULL ,
  `Project_idProject` INT NOT NULL ,
  PRIMARY KEY (`User_idUser`, `Project_idProject`) ,
  INDEX `fk_User_has_Case_Case1_idx` (`Project_idProject` ASC) ,
  INDEX `fk_User_has_Case_User1_idx` (`User_idUser` ASC) ,
  CONSTRAINT `fk_User_has_Case_User1`
    FOREIGN KEY (`User_idUser` )
    REFERENCES `OpenDF`.`User` (`idUser` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Case_Case1`
    FOREIGN KEY (`Project_idProject` )
    REFERENCES `OpenDF`.`Project` (`idProject` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDF`.`Directory`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `OpenDF`.`Directory` (
  `idDirectory` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL ,
  `path` VARCHAR(500) NULL ,
  `DiskImage_idDiskImage` INT NOT NULL ,
  `parentDirectory` INT NOT NULL ,
  PRIMARY KEY (`idDirectory`) ,
  INDEX `fk_Directory_DiskImage1_idx` (`DiskImage_idDiskImage` ASC) ,
  INDEX `fk_Directory_Directory1_idx` (`parentDirectory` ASC) ,
  CONSTRAINT `fk_Directory_DiskImage1`
    FOREIGN KEY (`DiskImage_idDiskImage` )
    REFERENCES `OpenDF`.`DiskImage` (`idDiskImage` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Directory_Directory1`
    FOREIGN KEY (`parentDirectory` )
    REFERENCES `OpenDF`.`Directory` (`idDirectory` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDF`.`File`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `OpenDF`.`File` (
  `idFile` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL ,
  `size` FLOAT NULL ,
  `MIMEtype` VARCHAR(45) NULL ,
  `createdDate` DATETIME NULL ,
  `UpdatedDate` DATETIME NULL ,
  `AccessDate` DATETIME NULL ,
  `parentDirectory` INT NOT NULL ,
  PRIMARY KEY (`idFile`) ,
  INDEX `fk_File_Directory1_idx` (`parentDirectory` ASC) ,
  CONSTRAINT `fk_File_Directory1`
    FOREIGN KEY (`parentDirectory` )
    REFERENCES `OpenDF`.`Directory` (`idDirectory` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDF`.`Browser`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `OpenDF`.`Browser` (
  `idBrowser` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL ,
  PRIMARY KEY (`idBrowser`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDF`.`BrowserSavedPassword`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `OpenDF`.`BrowserSavedPassword` (
  `idBrowserSavedPassword` INT NOT NULL AUTO_INCREMENT ,
  `username` VARCHAR(45) NULL ,
  `password` VARCHAR(45) NULL ,
  `Browser_idBrowser` INT NOT NULL ,
  `DiskImage_idDiskImage` INT NOT NULL ,
  PRIMARY KEY (`idBrowserSavedPassword`) ,
  INDEX `fk_BrowserData_Browser1_idx` (`Browser_idBrowser` ASC) ,
  INDEX `fk_BrowserSavedPassword_DiskImage1_idx` (`DiskImage_idDiskImage` ASC) ,
  CONSTRAINT `fk_BrowserData_Browser1`
    FOREIGN KEY (`Browser_idBrowser` )
    REFERENCES `OpenDF`.`Browser` (`idBrowser` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_BrowserSavedPassword_DiskImage1`
    FOREIGN KEY (`DiskImage_idDiskImage` )
    REFERENCES `OpenDF`.`DiskImage` (`idDiskImage` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDF`.`BrowserHistory`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `OpenDF`.`BrowserHistory` (
  `idBrowserHistory` INT NOT NULL AUTO_INCREMENT ,
  `URL` VARCHAR(450) NULL ,
  `Browser_idBrowser` INT NOT NULL ,
  PRIMARY KEY (`idBrowserHistory`) ,
  INDEX `fk_BrowserHistory_Browser1_idx` (`Browser_idBrowser` ASC) ,
  CONSTRAINT `fk_BrowserHistory_Browser1`
    FOREIGN KEY (`Browser_idBrowser` )
    REFERENCES `OpenDF`.`Browser` (`idBrowser` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDF`.`KnowFace`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `OpenDF`.`KnowFace` (
  `idKnowFace` INT NOT NULL ,
  `path` VARCHAR(45) NULL ,
  `name` VARCHAR(45) NULL ,
  `description` VARCHAR(450) NULL ,
  PRIMARY KEY (`idKnowFace`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDF`.`File_has_KnowFace`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `OpenDF`.`File_has_KnowFace` (
  `File_idFile` INT NOT NULL ,
  `KnowFace_idKnowFace` INT NOT NULL ,
  PRIMARY KEY (`File_idFile`, `KnowFace_idKnowFace`) ,
  INDEX `fk_File_has_KnowFace_KnowFace1_idx` (`KnowFace_idKnowFace` ASC) ,
  INDEX `fk_File_has_KnowFace_File1_idx` (`File_idFile` ASC) ,
  CONSTRAINT `fk_File_has_KnowFace_File1`
    FOREIGN KEY (`File_idFile` )
    REFERENCES `OpenDF`.`File` (`idFile` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_File_has_KnowFace_KnowFace1`
    FOREIGN KEY (`KnowFace_idKnowFace` )
    REFERENCES `OpenDF`.`KnowFace` (`idKnowFace` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDF`.`BadFile`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `OpenDF`.`BadFile` (
  `idBadFile` INT NOT NULL ,
  `name` VARCHAR(45) NULL ,
  `signature` VARCHAR(1024) NULL ,
  PRIMARY KEY (`idBadFile`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OpenDF`.`File_has_BadFile`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `OpenDF`.`File_has_BadFile` (
  `File_idFile` INT NOT NULL ,
  `BadFile_idBadFile` INT NOT NULL ,
  PRIMARY KEY (`File_idFile`, `BadFile_idBadFile`) ,
  INDEX `fk_File_has_BadFile_BadFile1_idx` (`BadFile_idBadFile` ASC) ,
  INDEX `fk_File_has_BadFile_File1_idx` (`File_idFile` ASC) ,
  CONSTRAINT `fk_File_has_BadFile_File1`
    FOREIGN KEY (`File_idFile` )
    REFERENCES `OpenDF`.`File` (`idFile` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_File_has_BadFile_BadFile1`
    FOREIGN KEY (`BadFile_idBadFile` )
    REFERENCES `OpenDF`.`BadFile` (`idBadFile` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `OpenDF` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
