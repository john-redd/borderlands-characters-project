const rollbar = require('../utils/rollbar');

const db = {
  async getCharacters() {
    return [
      {
        name: 'Salvador',
        level: 72,
      },
    ];
  },
};

async function getCharacters(req, res) {
  try {
    const result = await db.getCharacters();

    res.status(200).send(result);
  } catch (error) {
    rollbar.error(error, {
      user: {
        id: 1,
        email: 'john.redd@devmounta.in',
        firstName: 'John',
        lastName: 'Redd',
      },
    });

    res.sendStatus(500);
  }
}

module.exports = {
  getCharacters,
};
