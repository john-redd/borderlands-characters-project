const { DATABASE_URL } = process.env;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

async function createDatabaseSchema(req, res) {
  try {
    await sequelize.query(`
    drop table if exists users;

    create table users (
      id serial primary key,
      email text,
      hash text
    );
  `);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
}

module.exports = {
  createDatabaseSchema,
};
