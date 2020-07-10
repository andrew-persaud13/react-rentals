const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

const config = require('./config/dev');

const { provideErrorHandler } = require('./middlewares');
const { onlyAuthUser } = require('./controllers/users');
//models

require('./models/rental');
require('./models/user');

mongoose.connect(
  config.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log('DB connected...');
  }
);

//Middleware
app.use(bodyParser.json());
app.use(provideErrorHandler)

app.get('/api/v1/secret', onlyAuthUser, (req, res) => {
  return res.json({ message: 'Secret msg' });
});

//API routes
app.use('/api/v1/rentals', require('./routes/rentals'));
app.use('/api/v1/users', require('./routes/users'));

app.listen(PORT, () => console.log('Server is running', PORT));
