-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-11-21 01:53:13.335

-- tables
-- Table: gender
use storydb;
CREATE TABLE gender (
    createdAt timestamp NOT NULL default current_timestamp,
    id int NOT NULL AUTO_INCREMENT,
    name varchar(60) NOT NULL,
    description varchar(150) NOT NULL,
    CONSTRAINT gender_pk PRIMARY KEY (id)
);

-- Table: story
CREATE TABLE story (
    createdAt timestamp NOT NULL default current_timestamp,
    id int NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    text text NOT NULL,
    imageUrl varchar(255) NULL,
    userId int NOT NULL,
    CONSTRAINT story_pk PRIMARY KEY (id)
);

-- Table: story_gender
CREATE TABLE story_gender (
    id int NOT NULL AUTO_INCREMENT,
    story_id int NOT NULL,
    gender_id int NOT NULL,
    CONSTRAINT story_gender_pk PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE user (
    createdAt timestamp NOT NULL default current_timestamp,
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    phone varchar(9) NULL,
    CONSTRAINT user_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Pedido_Usuario (table: story)
ALTER TABLE story ADD CONSTRAINT Pedido_Usuario FOREIGN KEY Pedido_Usuario (userId)
    REFERENCES user (id);

-- Reference: story_gender_gender (table: story_gender)
ALTER TABLE story_gender ADD CONSTRAINT story_gender_gender FOREIGN KEY story_gender_gender (gender_id)
    REFERENCES gender (id);

-- Reference: story_gender_story (table: story_gender)
ALTER TABLE story_gender ADD CONSTRAINT story_gender_story FOREIGN KEY story_gender_story (story_id)
    REFERENCES story (id);

-- End of file.

