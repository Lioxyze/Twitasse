CREATE TABLE `user` (
  `UserId` int(11) PRIMARY KEY NOT NULL,
  `Firstname` varchar(45) NOT NULL,
  `Lastname` varchar(45) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Image` varchar(300) NOT NULL,
  `Password` varchar(73) NOT NULL,
  `id_role` int(11) NOT NULL
);

CREATE TABLE `role` (
  `id_role` int(11) PRIMARY KEY NOT NULL,
  `name_role` varchar(75) NOT NULL
);

CREATE TABLE `Follow` (
  `id_follow` int(65) NOT NULL,
  `NameFollow` varchar(255) NOT NULL,
  `IdUserFolowed` int NOT NULL,
  PRIMARY KEY (`id_follow`, `IdUserFolowed`)
);

ALTER TABLE `user` ADD CONSTRAINT `fk_role_user` FOREIGN KEY (`id_role`) REFERENCES `role` (`id_role`);

ALTER TABLE `user` ADD FOREIGN KEY (`UserId`) REFERENCES `Follow` (`id_follow`);

ALTER TABLE `user` ADD FOREIGN KEY (`UserId`) REFERENCES `Follow` (`IdUserFolowed`);
