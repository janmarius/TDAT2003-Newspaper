<p align="center">
  <a href="https://github.com/janmarius/TDAT2003-Newspaper/">
    <img src="res/logo.png" alt="logo" width="100" height="100">
  </a>
</p>

<h3 align="center">Newspaper</h3>

<p align="center">
  This is a newspaper for those who want to share the little things
</p>

<p align="center">
  <a href="https://travis-ci.org/janmarius/TDAT2003-Newspaper?icon=travis/">Travis CI</a>
</p>

[![Travis Build Status](https://travis-ci.org/janmarius/TDAT2003-Newspaper.svg?branch=main)](https://travis-ci.org/janmarius/TDAT2003-Newspaper)

## Table of contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Cloning and installing dependencies](#cloning-and-installing-dependencies)
- [Running](#running)
- [Testing](#testing)
- [Screenshots](#screenshots)



## Introduction
This community newspaper is a mini project in the course TDAT2003 - Software Engineering 2 with web applications. The newspaper is created as a communication paper, where everyone can publish an article in different categories, specifically News, Sport, Culture and Tech. The continuous integration is created with Travis CI. 

## Prerequisites
* Node.js
* npm

## Cloning and Installing Dependencies
```sh
git clone https://github.com/janmarius/TDAT2003-Newspaper.git
npm install --prefix TDAT2003-Newspaper/server
npm install --prefix TDAT2003-Newspaper/client
```

## Running
Add .env in TDAT2003-Newspaper/server:
```sh
touch TDAT2003-Newspaper/server/.env
```
Add database information in .env:
```
DB_DATABASE=<DATABASE>
DB_USER=<USER>
DB_PW=<PASSWORD>
DB_HOST=<HOST>
```
Then start the server and client:
```sh
# Start server
npm start --prefix TDAT2003-Newspaper/server
# Start client
npm start --prefix TDAT2003-Newspaper/client
```
Open http://localhost:3000/

## Testing
```sh
# Test server
npm test --prefix TDAT2003-Newspaper/server
# Test client
npm test --prefix TDAT2003-Newspaper/client
```

## Screenshots
### Front Page and Live Feed
![image](https://raw.githubusercontent.com/janmarius/TDAT2003-Newspaper/main/res/Website-example1.png)
### Page Navigation and Footer
![image](https://raw.githubusercontent.com/janmarius/TDAT2003-Newspaper/main/res/Website-example2.png)
### Category View
![image](https://raw.githubusercontent.com/janmarius/TDAT2003-Newspaper/main/res/Website-example3.png)
### Javascript and HTML
![image](https://raw.githubusercontent.com/janmarius/TDAT2003-Newspaper/main/res/Website-example5.png)
### Likes, Comment, Edit and Delete Article
![image](https://raw.githubusercontent.com/janmarius/TDAT2003-Newspaper/main/res/Website-example6.png)
### Article Editing
![image](https://raw.githubusercontent.com/janmarius/TDAT2003-Newspaper/main/res/Website-example7.png)
![image](https://raw.githubusercontent.com/janmarius/TDAT2003-Newspaper/main/res/Website-example8.png)
