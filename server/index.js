require('dotenv').config();

const { PORT, NODE_ENV, SESSION_SECRET } = process.env;

const path = require('path');
const express = require('express');

const app = express();
const { createDatabaseSchema } = require('./controllers/seed.controller');
const session = require('express-session');
const { authRouter } = require('./routers/auth.router');
const { charactersRouter } = require('./routers/characters.router');

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
app.use(express.urlencoded({ extended: true }));

app.post('/seed', createDatabaseSchema);
app.use('/auth', authRouter);
app.use('/api/characters', charactersRouter);

const publicDir = path.join(__dirname, '../client/public');
const charactersDir = path.join(__dirname, '../client/characters');

app.get('/', (req, res) => res.redirect('/login'));
app.use(express.static(publicDir));
app.use(
  '/characters',
  (req, res, next) => {
    if (req.session?.user?.id) {
      next();
    } else {
      res.redirect('/login');
    }
  },
  express.static(charactersDir)
);

app.listen(PORT, () => {
  if (NODE_ENV === 'development') {
    console.log(`Server running on http://localhost:${PORT}`);
  } else {
    console.log(`Server listening on ${PORT}`);
  }
});
