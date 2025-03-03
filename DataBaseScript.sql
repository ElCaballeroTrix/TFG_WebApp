-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema WebAppBBDD
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema WebAppBBDD
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `WebAppBBDD` DEFAULT CHARACTER SET utf8 ;
USE `WebAppBBDD` ;

-- -----------------------------------------------------
-- Table `WebAppBBDD`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WebAppBBDD`.`Usuario` (
  `nombreUsuario` VARCHAR(100) NOT NULL,
  `estudios` VARCHAR(100) NULL,
  `sexo` VARCHAR(20) NULL,
  `fechaNacimiento` DATE NULL,
  `fecha` DATE NULL,
  `edad` INT NULL,
  PRIMARY KEY (`nombreUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebAppBBDD`.`Parejas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WebAppBBDD`.`Parejas` (
  `idParejas` INT NOT NULL AUTO_INCREMENT,
  `tiempo` INT NULL,
  `movimientos` INT NULL,
  `nivel` INT NULL,
  `aciertos` INT NULL,
  `ppi` DOUBLE NULL,
  `casillaSeleccionada1` VARCHAR(10) NULL,
  `casillaSeleccionada2` VARCHAR(10) NULL,
  `casillaValida` VARCHAR(10) NULL,
  `tablero` VARCHAR(200) NULL,
  `usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idParejas`),
  INDEX `fk_Parejas_Usuario1_idx` (`usuario` ASC),
  CONSTRAINT `fk_Parejas_Usuario1`
    FOREIGN KEY (`usuario`)
    REFERENCES `WebAppBBDD`.`Usuario` (`nombreUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebAppBBDD`.`ArrastraYSuelta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WebAppBBDD`.`ArrastraYSuelta` (
  `idArrastraYSuelta` INT NOT NULL AUTO_INCREMENT,
  `tiempo` INT NULL,
  `movimientos` INT NULL,
  `nivel` INT NULL,
  `nombreElementoEscogido` VARCHAR(45) NULL,
  `aciertos` INT NULL,
  `ppi` DOUBLE NULL,
  `casillaSeleccionada` VARCHAR(10) NULL,
  `casillaValida` VARCHAR(10) NULL,
  `listaObjetos` VARCHAR(150) NULL,
  `listaCajas` VARCHAR(150) NULL,
  `usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idArrastraYSuelta`),
  INDEX `fk_ArrastraYSuelta_Usuario1_idx` (`usuario` ASC),
  CONSTRAINT `fk_ArrastraYSuelta_Usuario1`
    FOREIGN KEY (`usuario`)
    REFERENCES `WebAppBBDD`.`Usuario` (`nombreUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebAppBBDD`.`RecuerdaPalabras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WebAppBBDD`.`RecuerdaPalabras` (
  `idRecuerdaPalabras` INT NOT NULL AUTO_INCREMENT,
  `tiempo` VARCHAR(45) NULL,
  `movimientos` INT NULL,
  `nivel` VARCHAR(20) NULL,
  `aciertos` INT NULL,
  `temporizador` VARCHAR(5) NULL,
  `casillaSeleccionada` VARCHAR(10) NULL,
  `casillasValidas` VARCHAR(150) NULL,
  `ppi` DOUBLE NULL,
  `tablero` VARCHAR(300) NULL,
  `usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idRecuerdaPalabras`),
  INDEX `fk_RecuerdaPalabras_Usuario1_idx` (`usuario` ASC),
  CONSTRAINT `fk_RecuerdaPalabras_Usuario1`
    FOREIGN KEY (`usuario`)
    REFERENCES `WebAppBBDD`.`Usuario` (`nombreUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebAppBBDD`.`NoqueaLasTorres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WebAppBBDD`.`NoqueaLasTorres` (
  `idNoqueaLasTorres` INT NOT NULL AUTO_INCREMENT,
  `tiempo` INT NULL,
  `casillaPulsada` VARCHAR(10) NULL,
  `casillaValida` VARCHAR(10) NULL,
  `ppi` DOUBLE NULL,
  `nivel` INT NULL,
  `fuerzaJugador` INT NULL,
  `tablero` VARCHAR(200) NULL,
  `usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idNoqueaLasTorres`),
  INDEX `fk_NoquaLasTorres_Usuario1_idx` (`usuario` ASC),
  CONSTRAINT `fk_NoquaLasTorres_Usuario1`
    FOREIGN KEY (`usuario`)
    REFERENCES `WebAppBBDD`.`Usuario` (`nombreUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebAppBBDD`.`CentroBola`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WebAppBBDD`.`CentroBola` (
  `idCentroBola` INT NOT NULL AUTO_INCREMENT,
  `tiempo` INT NULL,
  `puntoPulsado` VARCHAR(30) NULL,
  `distanciaRespectoAlMedio` VARCHAR(30) NULL,
  `nivel` INT NULL,
  `ppi` DOUBLE NULL,
  `usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idCentroBola`),
  INDEX `fk_CentroBola_Usuario1_idx` (`usuario` ASC),
  CONSTRAINT `fk_CentroBola_Usuario1`
    FOREIGN KEY (`usuario`)
    REFERENCES `WebAppBBDD`.`Usuario` (`nombreUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebAppBBDD`.`MetaBola`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WebAppBBDD`.`MetaBola` (
  `idMetaBola` INT NOT NULL AUTO_INCREMENT,
  `tiempo` INT NULL,
  `usuarioDetuvoLaBola` BIT(1) NULL,
  `puntoPulsado` VARCHAR(30) NULL,
  `puntosValidos` VARCHAR(200) NULL,
  `distanciaRespectoAMeta` VARCHAR(30) NULL,
  `nivel` INT NULL,
  `ppi` DOUBLE NULL,
  `usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idMetaBola`),
  INDEX `fk_MetaBola_Usuario1_idx` (`usuario` ASC),
  CONSTRAINT `fk_MetaBola_Usuario1`
    FOREIGN KEY (`usuario`)
    REFERENCES `WebAppBBDD`.`Usuario` (`nombreUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebAppBBDD`.`MOCA_Parte1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WebAppBBDD`.`MOCA_Parte1` (
  `idMOCA_Parte1` INT NOT NULL AUTO_INCREMENT,
  `tiempo` INT NULL,
  `dibujo` LONGBLOB NULL,
  `usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idMOCA_Parte1`),
  INDEX `fk_MOCA_Parte1_Usuario1_idx` (`usuario` ASC),
  CONSTRAINT `fk_MOCA_Parte1_Usuario1`
    FOREIGN KEY (`usuario`)
    REFERENCES `WebAppBBDD`.`Usuario` (`nombreUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebAppBBDD`.`MOCA_Parte2`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WebAppBBDD`.`MOCA_Parte2` (
  `idMOCA_Parte2` INT NOT NULL AUTO_INCREMENT,
  `tiempo` INT NULL,
  `dibujoReloj` LONGBLOB NULL,
  `usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idMOCA_Parte2`),
  INDEX `fk_MOCA_Parte2_Usuario1_idx` (`usuario` ASC),
  CONSTRAINT `fk_MOCA_Parte2_Usuario1`
    FOREIGN KEY (`usuario`)
    REFERENCES `WebAppBBDD`.`Usuario` (`nombreUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebAppBBDD`.`MOCA_Parte3`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WebAppBBDD`.`MOCA_Parte3` (
  `idMOCA_Parte3` INT NOT NULL AUTO_INCREMENT,
  `tiempo` VARCHAR(50) NULL,
  `imagenIzquierda` VARCHAR(50) NULL,
  `imagenCentro` VARCHAR(45) NULL,
  `imagenDerecha` VARCHAR(50) NULL,
  `usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idMOCA_Parte3`),
  INDEX `fk_MOCA_Parte3_Usuario1_idx` (`usuario` ASC),
  CONSTRAINT `fk_MOCA_Parte3_Usuario1`
    FOREIGN KEY (`usuario`)
    REFERENCES `WebAppBBDD`.`Usuario` (`nombreUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebAppBBDD`.`MOCA_Parte4`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WebAppBBDD`.`MOCA_Parte4` (
  `idMOCA_Parte4` INT NOT NULL AUTO_INCREMENT,
  `tiempo` INT NULL,
  `audio1` MEDIUMBLOB NULL,
  `audio2` MEDIUMBLOB NULL,
  `usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idMOCA_Parte4`),
  INDEX `fk_MOCA_Parte4_Usuario1_idx` (`usuario` ASC),
  CONSTRAINT `fk_MOCA_Parte4_Usuario1`
    FOREIGN KEY (`usuario`)
    REFERENCES `WebAppBBDD`.`Usuario` (`nombreUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebAppBBDD`.`MOCA_Parte5`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WebAppBBDD`.`MOCA_Parte5` (
  `idMOCA_Parte5` INT NOT NULL AUTO_INCREMENT,
  `tiempo` INT NULL,
  `audio1` MEDIUMBLOB NULL,
  `audio2` MEDIUMBLOB NULL,
  `numeroDeAPulsadas` INT NULL,
  `resta7_1` INT NULL,
  `resta7_2` INT NULL,
  `resta7_3` INT NULL,
  `resta7_4` INT NULL,
  `resta7_5` INT NULL,
  `usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idMOCA_Parte5`),
  INDEX `fk_MOCA_Parte5_Usuario1_idx` (`usuario` ASC),
  CONSTRAINT `fk_MOCA_Parte5_Usuario1`
    FOREIGN KEY (`usuario`)
    REFERENCES `WebAppBBDD`.`Usuario` (`nombreUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebAppBBDD`.`MOCA_Parte6`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WebAppBBDD`.`MOCA_Parte6` (
  `idMOCA_Parte6` INT NOT NULL AUTO_INCREMENT,
  `tiempo` INT NULL,
  `audio1` MEDIUMBLOB NULL,
  `audio2` MEDIUMBLOB NULL,
  `audio3` MEDIUMBLOB NULL,
  `pareja1` VARCHAR(45) NULL,
  `pareja2` VARCHAR(45) NULL,
  `usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idMOCA_Parte6`),
  INDEX `fk_MOCA_Parte6_Usuario1_idx` (`usuario` ASC),
  CONSTRAINT `fk_MOCA_Parte6_Usuario1`
    FOREIGN KEY (`usuario`)
    REFERENCES `WebAppBBDD`.`Usuario` (`nombreUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WebAppBBDD`.`MOCA_Parte7`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WebAppBBDD`.`MOCA_Parte7` (
  `idMOCA_Parte7` INT NOT NULL AUTO_INCREMENT,
  `tiempo` INT NULL,
  `palabra1` VARCHAR(45) NULL,
  `palabra2` VARCHAR(45) NULL,
  `palabra3` VARCHAR(45) NULL,
  `palabra4` VARCHAR(45) NULL,
  `palabra5` VARCHAR(45) NULL,
  `pistaPalabra1` BIT(1) NULL,
  `pistaPalabra2` BIT(1) NULL,
  `pistaPalabra3` BIT(1) NULL,
  `pistaPalabra4` BIT(1) NULL,
  `pistaPalabra5` VARCHAR(45) NULL,
  `diaMes` VARCHAR(45) NULL,
  `mes` VARCHAR(45) NULL,
  `año` VARCHAR(45) NULL,
  `diaSemana` VARCHAR(45) NULL,
  `lugar` VARCHAR(45) NULL,
  `localidad` VARCHAR(45) NULL,
  `usuario` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idMOCA_Parte7`),
  INDEX `fk_MOCA_Parte7_Usuario1_idx` (`usuario` ASC),
  CONSTRAINT `fk_MOCA_Parte7_Usuario1`
    FOREIGN KEY (`usuario`)
    REFERENCES `WebAppBBDD`.`Usuario` (`nombreUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
