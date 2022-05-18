const bcrypt = require('bcryptjs');
const sequelize = require('../utils/db');

async function getUserByEmail(email) {
  const [existingRecord] = await sequelize.query(`
    select * from users where email = '${email}';
  `);

  if (existingRecord.length) {
    return existingRecord[0];
  }

  return null;
}

async function handleSignUp(req, res) {
  const { email, password } = req.body;

  const existingRecord = await getUserByEmail(email);

  if (existingRecord) {
    return res.sendStatus(400);
  }

  const hash = bcrypt.hashSync(password, 10);

  await sequelize.query(`
    insert into users (email, hash) values ('${email}', '${hash}');
  `);

  const newRecord = await getUserByEmail(email);

  req.session.user = {
    ...newRecord,
  };

  res.sendStatus(200);
}

async function handleLogin(req, res) {
  const { email, password } = req.body;

  const existingRecord = await getUserByEmail(email);

  if (!existingRecord) {
    return res.sendStatus(400);
  }

  const doesPasswordMatch = bcrypt.compareSync(password, existingRecord.hash);

  if (!doesPasswordMatch) {
    return res.sendStatus(400);
  }

  req.session.user = {
    ...existingRecord,
  };

  res.redirect('/characters');
}

function handleLogout(req, res) {
  req.session.destroy();

  res.sendStatus(200);
}

module.exports = {
  handleSignUp,
  handleLogin,
  handleLogout,
};
