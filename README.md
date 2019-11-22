# Example client-server application using a client service object
The application will reload on source changes.

## Client: run tests and start
From the top-level repository folder:
```sh
cd client
npm install
npm test
npm start
```

## Server: run tests and start
Prerequisite: mysql-server installed locally

In case you have mysql 8 or newer installed:
```sh
echo "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY ''" | mysql -uroot
```

Create the mysql database used by server:
```sh
echo "CREATE DATABASE School" | mysql -uroot
```

From the top-level repository folder:
```sh
cd server
npm install
npm test
npm start
```

## Open application
http://localhost:3000

## For those interested: production-mode
To build the client for production/deployment:
```sh
npm run build-prod
```

To run the server in production mode:
```sh
npm run start-prod
```
