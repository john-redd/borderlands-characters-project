const sequelize = require('../utils/db');

async function createDatabaseSchema(req, res) {
  try {
    await sequelize.query(`
    drop table if exists users;
    drop table if exists characters;

    create table users (
      id serial primary key,
      email text,
      hash text
    );

    create table characters (
      id serial primary key,
      name text,
      level int,
      user_id int references users(id)
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
