const Squelize = require('sequelize');

const sequelize = new Squelize("socialApp","root","houssemess123",{
    host: "localhost:3306",
    dialect: "mysql",
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};

db.Sequelize = Squelize;
db.sequelize = sequelize;
module.exports = db;