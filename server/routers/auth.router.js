const express = require('express');
const {
  handleSignUp,
  handleLogin,
  handleLogout,
} = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/sign-up', handleSignUp);
authRouter.post('/login', handleLogin);
authRouter.delete('/logout', handleLogout);

module.exports = { authRouter };
