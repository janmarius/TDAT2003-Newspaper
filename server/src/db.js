// @flow

import Sequelize from 'sequelize';
require('dotenv').config();

const sequelize = new Sequelize(
  // $FlowFixMe
  process.env.CI ? 'travis_ci' : process.env.DB_DATABASE,
  process.env.CI ? 'root' : process.env.DB_USER,
  process.env.CI ? '' : process.env.DB_PW,
  {
    host: process.env.CI ? '127.0.0.1' : process.env.DB_HOST, // The host is '127.0.0.1' when running in Travis CI
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
