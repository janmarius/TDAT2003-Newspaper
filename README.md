<p align="center">
  <a href="https://github.com/janmarius/TDAT2003-News-Paper/">
    <img src="res/logo.png" alt="logo" width="100" height="100">
  </a>
</p>

<h3 align="center">News Paper</h3>

<p align="center">
  News Paper
</p>

<p align="center">
  <a href="https://travis-ci.org/janmarius/TDAT2003-News-Paper?icon=travis/">Travis CI</a>
</p>

[![Travis Build Status](https://travis-ci.org/janmarius/TDAT2003-News-Paper.svg?branch=master)](https://travis-ci.org/janmarius/TDAT2003-News-Paper)

## Table of contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installing dependencies](#installing-dependencies)
- [Compiling and running](#compiling-and-running)
- [Testing](#testing)
- [What's included](#whats-included)
- [Implemented functionality](#implemented-functionality)
- [Future work](#future-work)



## Introduction


## Prerequisites
* Linux
* Node.js
* npm

## Cloning and Installing dependencies
```sh
git clone https://github.com/janmarius/TDAT2003-News-Paper.git
npm install --prefix TDAT2003-News-Paper/server
npm install --prefix TDAT2003-News-Paper/client
```

## Running
Add .env in TDAT2003-News-Paper/server:
```sh
touch /TDAT2003-News-Paper/server/.env
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
npm start --prefix TDAT2003-News-Paper/server
# Start client
npm start --prefix TDAT2003-News-Paper/client
```
Open http://localhost:3000/

## Testing
```sh
# Test server
npm test --prefix TDAT2003-News-Paper/server
# Test client
npm test --prefix TDAT2003-News-Paper/client
```

## What's included


## Implemented functionality


## Future work
