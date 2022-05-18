const express = require('express');
const {
  getCharacters,
  createCharacter,
} = require('../controllers/characters.controller');

const charactersRouter = express.Router();

charactersRouter.get('/', getCharacters);
charactersRouter.post('/', createCharacter);

module.exports = { charactersRouter };
