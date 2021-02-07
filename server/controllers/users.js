const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.sendApiError({
      title: 'Invalid credentials.',
      detail: 'Email or password is missing.',
    });
  }

  User.findOne({ email }, (error, existingUser) => {
    if (error) {
      return res.mongoError(error);
    }

    if (!existingUser) {
      return res.sendApiError({
        title: 'Invalid credentials.',
        detail: 'Email or password incorrect.',
      });
    }

    if (!existingUser.verifyPassword(password)) {
      return res.sendApiError({
        title: 'Invalid credentials.',
        detail: 'Email or password incorrect.',
      });
    }

    //Got here. Everything is good. Send token
    const token = jwt.sign(
      {
        sub: existingUser.id,
        username: existingUser.username,
      },
      config.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.json({ token });
  });
};

exports.register = (req, res) => {
  const { username, email, password, passwordConfirmation, avatar } = req.body;

  if (!password || !email) {
    return res.sendApiError({
      title: 'Missing data.',
      detail: 'Please provide email and password',
    });
  }

  if (password !== passwordConfirmation) {
    return res.sendApiError({
      title: 'Invalid password',
      detail: 'Password confirmation does not match password.',
    });
  }

  User.findOne({ email }, (error, existingUser) => {
    if (error) {
      return res.mongoError(error);
    }

    if (existingUser) {
      return res.sendApiError({
        title: 'Invalid email.',
        detail: 'User already exists.',
      });
    }

    const user = new User({ username, email, password, avatar });

    user.save(error => {
      if (error) {
        return res.mongoError(error);
      }
      return res.json({ status: 'User registered' });
    });
  });
};

exports.onlyAuthUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return notAuthorized(res);
  }

  const decodedToken = parseToken(token);

  if (!decodedToken) {
    return notAuthorized(res);
  }

  //Token is good. Find user

  User.findById(decodedToken.sub, (error, user) => {
    if (error) {
      return res.mongoError(error);
    }

    if (!user) {
      return notAuthorized(res);
    }

    res.locals.user = user;
    next();
  });
};

function notAuthorized(res) {
  return res.status(401).send({
    errors: [{ title: 'Not authorized.', detail: 'Please login.' }],
  });
}

function parseToken(token) {
  try {
    return jwt.verify(token.split(' ')[1], config.JWT_SECRET);
  } catch (error) {
    return null;
  }
}
