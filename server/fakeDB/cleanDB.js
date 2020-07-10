const mongoose = require('mongoose');
const config = require('../config/dev');

const fakeDB = require('./FakeDB');

mongoose.connect(
  config.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  async () => {
    await fakeDB.populate();
    mongoose.connection.close();
  }
);
