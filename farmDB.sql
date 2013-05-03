SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `farmDB` ;
CREATE SCHEMA IF NOT EXISTS `farmDB` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
USE `farmDB` ;

-- -----------------------------------------------------
-- Table `farmDB`.`Alliances`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Alliances` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Alliances` (
  `id` INT NOT NULL ,
  `name` VARCHAR(45) NULL ,
  `master_user_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `master_idx` (`master_user_id` ASC) ,
  CONSTRAINT `master`
    FOREIGN KEY (`master_user_id` )
    REFERENCES `farmDB`.`Users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmDB`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Users` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Users` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `pseudo` VARCHAR(45) NULL ,
  `mail` VARCHAR(45) NULL ,
  `password` VARCHAR(100) NULL,
  `status` TINYINT NULL ,
  `ip` VARCHAR(45) NULL ,
  `nb_fertilisants` INT NULL ,
  `energies` INT NULL ,
  `energies_max` INT NULL ,
  `niveau` INT NULL ,
  `alliance_id` INT NULL ,
  `argent` INT NULL ,
  `experience` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `users_to_alliances_idx` (`alliance_id` ASC) ,
  CONSTRAINT `users_to_alliances`
    FOREIGN KEY (`alliance_id` )
    REFERENCES `farmDB`.`Alliances` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmDB`.`Stockages_spec`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Stockages_spec` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Stockages_spec` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL ,
  `taille` INT NULL ,
  `prix` INT NULL ,
  `stockage` INT NULL ,
  `consommation` INT NULL ,
  `constructionTime` INT NULL ,
  `niveau_requis` INT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmDB`.`Energies_spec`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Energies_spec` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Energies_spec` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL ,
  `prix` INT NULL ,
  `constructionTime` INT NULL ,
  `production` INT NULL ,
  `niveau_requis` INT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmDB`.`Armes_spec`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Armes_spec` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Armes_spec` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL ,
  `puissance` INT NULL ,
  `precision` INT NULL ,
  `vitesse` INT NULL ,
  `prix` INT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmDB`.`Graines_spec`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Graines_spec` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Graines_spec` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL ,
  `maturation` INT NULL ,
  `pourrissement` INT NULL ,
  `production` INT NULL ,
  `stockage` INT NULL ,
  `croissance` INT NULL ,
  `poids` INT NULL ,
  `prix` INT NULL ,
  `sante_min` INT NULL ,
  `niveau_requis` INT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmDB`.`Tiles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Tiles` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Tiles` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `x` INT NULL ,
  `y` INT NULL ,
  `isEmpty` TINYINT NULL ,
  `humidite` INT NULL ,
  `fertilite` INT NULL ,
  `isVisible` TINYINT NULL ,
  `user_id` INT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmDB`.`Stockages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Stockages` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Stockages` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `stockage_state` INT NULL ,
  `isConstruct` TINYINT NULL ,
  `user_id` INT NULL ,
  `stockages_spec_id` INT NULL ,
  `tile_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `stockages_to_user_idx` (`user_id` ASC) ,
  INDEX `stockages_to_spec_idx` (`stockages_spec_id` ASC) ,
  INDEX `stockages_to_tiles_idx` (`tile_id` ASC) ,
  CONSTRAINT `stockages_to_user`
    FOREIGN KEY (`user_id` )
    REFERENCES `farmDB`.`Users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `stockages_to_spec`
    FOREIGN KEY (`stockages_spec_id` )
    REFERENCES `farmDB`.`Stockages_spec` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `stockages_to_tiles`
    FOREIGN KEY (`tile_id` )
    REFERENCES `farmDB`.`Tiles` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '<double-click to overwrite multiple objects>';


-- -----------------------------------------------------
-- Table `farmDB`.`Energies`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Energies` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Energies` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `isConstruct` TINYINT NULL ,
  `user_id` INT NULL ,
  `energies_spec_id` INT NULL ,
  `tile_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `energies_to_user_idx` (`user_id` ASC) ,
  INDEX `energies_to_spec_idx` (`energies_spec_id` ASC) ,
  INDEX `energies_to_tiles_idx` (`tile_id` ASC) ,
  CONSTRAINT `energies_to_user`
    FOREIGN KEY (`user_id` )
    REFERENCES `farmDB`.`Users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `energies_to_spec`
    FOREIGN KEY (`energies_spec_id` )
    REFERENCES `farmDB`.`Energies_spec` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `energies_to_tiles`
    FOREIGN KEY (`tile_id` )
    REFERENCES `farmDB`.`Tiles` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '<double-click to overwrite multiple objects>';


-- -----------------------------------------------------
-- Table `farmDB`.`Armes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Armes` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Armes` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `user_id` INT NULL ,
  `armes_spec_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `armes_to_user_idx` (`user_id` ASC) ,
  INDEX `armes_to_spec_idx` (`armes_spec_id` ASC) ,
  CONSTRAINT `armes_to_user`
    FOREIGN KEY (`user_id` )
    REFERENCES `farmDB`.`Users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `armes_to_spec`
    FOREIGN KEY (`armes_spec_id` )
    REFERENCES `farmDB`.`Armes_spec` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '<double-click to overwrite multiple objects>';


-- -----------------------------------------------------
-- Table `farmDB`.`Graines`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Graines` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Graines` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `nb` INT NULL ,
  `user_id` INT NULL ,
  `graines_spec_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `graines_tp_user_idx` (`user_id` ASC) ,
  INDEX `graines_to_spec_idx` (`graines_spec_id` ASC) ,
  CONSTRAINT `graines_to_user`
    FOREIGN KEY (`user_id` )
    REFERENCES `farmDB`.`Users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `graines_to_spec`
    FOREIGN KEY (`graines_spec_id` )
    REFERENCES `farmDB`.`Graines_spec` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '<double-click to overwrite multiple objects>';


-- -----------------------------------------------------
-- Table `farmDB`.`Fruits_spec`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Fruits_spec` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Fruits_spec` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL ,
  `prix_vente` INT NULL ,
  `stockage` INT NULL ,
  `poids` INT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmDB`.`Fruits`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Fruits` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Fruits` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `nb` INT NULL ,
  `user_id` INT NULL ,
  `fruits_spec_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fruits_to_user_idx` (`user_id` ASC) ,
  INDEX `fruit_to_spec_idx` (`fruits_spec_id` ASC) ,
  CONSTRAINT `fruits_to_user`
    FOREIGN KEY (`user_id` )
    REFERENCES `farmDB`.`Users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fruits_to_spec`
    FOREIGN KEY (`fruits_spec_id` )
    REFERENCES `farmDB`.`Fruits_spec` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '<double-click to overwrite multiple objects>';


-- -----------------------------------------------------
-- Table `farmDB`.`Plantes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Plantes` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Plantes` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `croissance` INT NULL ,
  `health` INT NULL ,
  `user_id` INT NULL ,
  `graines_spec_id` INT NULL ,
  `tile_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `plantes_to_user_idx` (`user_id` ASC) ,
  INDEX `plantes_to_spec_idx` (`graines_spec_id` ASC) ,
  INDEX `plantes_to_tiles_idx` (`tile_id` ASC) ,
  CONSTRAINT `plantes_to_user`
    FOREIGN KEY (`user_id` )
    REFERENCES `farmDB`.`Users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `plantes_to_spec`
    FOREIGN KEY (`graines_spec_id` )
    REFERENCES `farmDB`.`Graines_spec` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `plantes_to_tiles`
    FOREIGN KEY (`tile_id` )
    REFERENCES `farmDB`.`Tiles` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '<double-click to overwrite multiple objects>';


-- -----------------------------------------------------
-- Table `farmDB`.`Maisons`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Maisons` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Maisons` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `tile_id` INT NULL ,
  `user_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `maisons_to_users_idx` (`user_id` ASC) ,
  INDEX `maisons_to_tiles_idx` (`tile_id` ASC) ,
  CONSTRAINT `maisons_to_users`
    FOREIGN KEY (`user_id` )
    REFERENCES `farmDB`.`Users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `maisons_to_tiles`
    FOREIGN KEY (`tile_id` )
    REFERENCES `farmDB`.`Tiles` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmDB`.`Arrosoirs_spec`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Arrosoirs_spec` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Arrosoirs_spec` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL ,
  `prix` INT NULL ,
  `stockage` INT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmDB`.`Arrosoirs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Arrosoirs` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Arrosoirs` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `user_id` INT NULL ,
  `arrosoirs_spec_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `arrosoirs_to_user_idx` (`user_id` ASC) ,
  INDEX `arrosoirs_to_spec_idx` (`arrosoirs_spec_id` ASC) ,
  CONSTRAINT `arrosoirs_to_user`
    FOREIGN KEY (`user_id` )
    REFERENCES `farmDB`.`Users` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `arrosoirs_to_spec`
    FOREIGN KEY (`arrosoirs_spec_id` )
    REFERENCES `farmDB`.`Arrosoirs_spec` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmDB`.`Users_level_spec`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Users_level_spec` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Users_level_spec` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `tile_next_level` INT NULL ,
  `conquete_timer` INT NULL ,
  `wait_conquetes_timer` INT NULL ,
  `resistance` INT NULL ,
  `victory_timer` INT NULL ,
  `win_regen` INT NULL ,
  `lose_regen` INT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmDB`.`Achats`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Achats` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Achats` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `date` DATETIME NULL ,
  `graines_spec_id` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `achats_to_spec_idx` (`graines_spec_id` ASC) ,
  CONSTRAINT `achats_to_spec`
    FOREIGN KEY (`graines_spec_id` )
    REFERENCES `farmDB`.`Graines_spec` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmDB`.`Pluie`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Pluie` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Pluie` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `isActive` TINYINT NULL ,
  `origin_tile_id` INT NULL ,
  `longueur` INT NULL ,
  `largeur` INT NULL ,
  `duree` INT NULL ,
  `x` INT NULL ,
  `y` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `origin_tile_id_idx` (`origin_tile_id` ASC) ,
  CONSTRAINT `pluie_to_tiles`
    FOREIGN KEY (`origin_tile_id` )
    REFERENCES `farmDB`.`Tiles` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmDB`.`Tornade`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Tornade` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Tornade` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `isActive` TINYINT NULL ,
  `origin_tile_id` INT NULL ,
  `vectorX` INT NULL ,
  `vexctorY` INT NULL ,
  `longueur` INT NULL ,
  `largeur` INT NULL ,
  `duree` INT NULL ,
  `x` INT NULL ,
  `y` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `origin_tile_id_idx` (`origin_tile_id` ASC) ,
  CONSTRAINT `tornades_to_tiles`
    FOREIGN KEY (`origin_tile_id` )
    REFERENCES `farmDB`.`Tiles` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmDB`.`Meteor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Meteor` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Meteor` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `isActive` TINYINT NULL ,
  `origin_tile_id` INT NULL ,
  `longueur` INT NULL ,
  `largeur` INT NULL ,
  `duree` INT NULL ,
  `x` INT NULL ,
  `y` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `meteor_to_tiles_idx` (`origin_tile_id` ASC) ,
  CONSTRAINT `meteor_to_tiles`
    FOREIGN KEY (`origin_tile_id` )
    REFERENCES `farmDB`.`Tiles` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `farmDB`.`Sauterelles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `farmDB`.`Sauterelles` ;

CREATE  TABLE IF NOT EXISTS `farmDB`.`Sauterelles` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `isActive` TINYINT NULL ,
  `origin_tile_id` INT NULL ,
  `vectorX` INT NULL ,
  `vexctorY` INT NULL ,
  `longueur` INT NULL ,
  `largeur` INT NULL ,
  `duree` INT NULL ,
  `x` INT NULL ,
  `y` INT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `sauterelles_to_tiles_idx` (`origin_tile_id` ASC) ,
  CONSTRAINT `sauterelles_to_tiles`
    FOREIGN KEY (`origin_tile_id` )
    REFERENCES `farmDB`.`Tiles` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
