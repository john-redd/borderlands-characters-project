const { ROLLBAR_POST_SERVER_ITEM_ACCESS_TOKEN } = process.env;
const Rollbar = require('rollbar');
const rollbar = new Rollbar({
  accessToken: ROLLBAR_POST_SERVER_ITEM_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    code_version: '1.0.0',
  },
});

module.exports = rollbar;
