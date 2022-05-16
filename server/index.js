require('dotenv').config();

const { PORT, NODE_ENV, SESSION_SECRET } = process.env;

const path = require('path');
const express = require('express');

const app = express();
const { getCharacters } = require('./controllers/characters.controller');
const {
  handleSignUp,
  handleLogin,
  handleLogout,
} = require('./controllers/auth.controller');
const { createDatabaseSchema } = require('./controllers/seed.controller');
const session = require('express-session');

app.use(
  session({
    secret: SESSION_SECRET,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());

app.post('/seed', createDatabaseSchema);

app.post('/auth/sign-up', handleSignUp);
app.post('/auth/login', handleLogin);
app.delete('/auth/logout', handleLogout);

app.get('/api/characters', getCharacters);

app.get('/', (req, res) => res.redirect('/login'));

const publicDir = path.join(__dirname, '../client/public');
const protectedDir = path.join(__dirname, '../client/protected');

app.use(express.static(publicDir));
app.use(
  '/protected',
  (req, res, next) => {
    if (req.session?.user?.id) {
      next();
    } else {
      res.redirect('/login');
    }
  },
  express.static(protectedDir)
);

app.listen(PORT, () => {
  if (NODE_ENV === 'development') {
    console.log(`Server running on http://localhost:${PORT}`);
  } else {
    console.log(`Server listening on ${PORT}`);
  }
});
