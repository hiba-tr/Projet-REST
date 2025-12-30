TP333 – Application CRUD REST JAX-RS / JPA / Hibernate



DESCRIPTION DU PROJET



Le projet tp333 est une application web Java qui implémente un système CRUD (Create, Read, Update, Delete) pour la gestion des personnes.



L’application repose sur une architecture REST côté backend en utilisant JAX-RS (Jersey). La persistance des données est assurée par JPA/Hibernate avec une base de données MySQL.



Le frontend est développé avec HTML, JavaScript et Bootstrap pour la structure générale de l’interface, ainsi qu’un CSS classique pour quelques personnalisations.



L’objectif principal du projet est de démontrer la communication entre un frontend web et un backend REST, ainsi que la migration de JDBC vers JPA/Hibernate.



STRUCTURE DU PROJET



tp333

│

├── pom.xml

│

├── Java Resources

│ └── src

│ ├── com.info.model

│ │ └── Person.java

│ │

│ ├── com.info.router

│ │ └── RestRouter.java

│ │

│ ├── com.info.service

│ │ ├── PersonService.java

│ │ └── PersonServiceImpl.java

│ │

│ └── META-INF

│ └── persistence.xml

│

├── WebContent

│ ├── index.html

│ ├── style.css

│ ├── script.js

│ └── WEB-INF

│ └── web.xml



TECHNOLOGIES UTILISÉES



Java 8

Maven (gestion des dépendances)

JAX-RS (Jersey) pour les services REST

JPA / Hibernate pour la persistance des données

MySQL comme base de données

HTML5, CSS3 et JavaScript pour le frontend

Bootstrap pour la structure générale de l’interface

CSS classique pour les personnalisations

Apache Tomcat comme serveur d’application



INSTRUCTIONS POUR EXÉCUTER LE PROJET



Cloner le projet depuis GitHub

Lien : [https://github.com/USERNAME/tp333](https://github.com/hiba-tr/Projet-REST)



Importer le projet dans Eclipse

File → Import → Existing Maven Project

Sélectionner le dossier du projet



Configurer la base de données MySQL

Créer une base de données nommée : tp2db

Vérifier les paramètres dans le fichier persistence.xml

URL, nom d’utilisateur et mot de passe



Lancer le serveur Tomcat

Ajouter le projet au serveur Tomcat

Démarrer le serveur



Accéder à l’application

Frontend :

http://localhost:8080/tp333/index.html



API REST :

http://localhost:8080/tp333/api/users



API REST – EXEMPLES D’ENDPOINTS



GET /api/users/affiche : récupérer toutes les personnes

POST /api/users/ajouter : ajouter une personne

PUT /api/users/modifier/{id} : modifier une personne

DELETE /api/users/supprimer/{id} : supprimer une personne

GET /api/users/{id} : rechercher une personne par ID







Il est possible d’ajouter des captures d’écran montrant :

L’interface principale

Le formulaire d’ajout et de modification

La liste des utilisateurs



LIEN VERS LA VIDÉO DE DÉMONSTRATION



https://drive.google.com/file/d/10ps7y5r\_f75i9UvDcNbmHZLuzM7yVS9m/view?usp=sharing



CONCLUSION



Ce projet met en pratique les concepts fondamentaux du développement web Java moderne, notamment les services REST, la persistance avec JPA/Hibernate et la communication entre le frontend et le backend. Il constitue une base solide pour comprendre l’architecture des applications web Java.

