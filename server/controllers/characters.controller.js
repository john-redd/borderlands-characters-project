const rollbar = require('../utils/rollbar');
const sequelize = require('../utils/db');

async function getCharacters(req, res) {
  const userID = req.session.user.id;

  try {
    const [result] = await sequelize.query(`
      select * from characters where user_id = ${userID}
    `);

    res.status(200).send(result);
  } catch (error) {
    const user = req.session.user; // This information is here because I added to the session in my auth.controller.js

    rollbar.error(error, {
      user: user,
    });

    res.sendStatus(500);
  }
}

async function createCharacter(req, res) {
  const { name, level: levelStr } = req.body;
  const userID = req.session.user.id;

  await sequelize.query(`
    insert into characters (name, level, user_id) values ('${name}', ${+levelStr}, ${userID});
  `);

  res.redirect('/characters');
}

module.exports = {
  getCharacters,
  createCharacter,
};
