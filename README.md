# Postmarks

## What is it?

Postmarks is a bookmarking app. To start using the app, users must log-in or sign-up with their email. Passwords are hashed before they are stored in the database. Users can add, edit, and delete bookmarks, and bookmarks may have names, notes or images attached to them. Users can also add, edit, and delete folders, and display/organize their bookmarks by folder. Finally, users can search through all of their bookmarks.

* [View the Deployed Site](https://thawing-earth-99346.herokuapp.com/)

## Stack
Postmarks is built on the front-end with:
* React
* Redux
* HTML, CSS

The back-end is built on:
* Node
* Express
* Knex
* PostgreSQL
* Passport
* Bcrypt

### Setting up a project

Running the project locally requires knowledge of PostgreSQL.

* Move into your projects directory: `cd ~/YOUR_PROJECTS_DIRECTORY`
* Clone this repository: `git clone https://github.com/wshuang6/bookmark-app`
* Move into the project directory: `cd bookmark-app`
* Install the dependencies: `npm install`
* Set up the PostgreSQL database, either locally or online. The database should include the following: 

* Create a .env file in the server folder that has the appropriate database connection information
* Run the project with `npm run dev`, which starts a server on http://localhost:8080

## Authors
Franklin Carvajal & William Huang