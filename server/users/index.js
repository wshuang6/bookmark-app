const bcrypt = require('bcryptjs');

const {BasicStrategy} = require('passport-http');
const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const {DEV, PROD} = require('../config');
const knex = require('knex')(DEV);

const router = express.Router();

router.use(jsonParser);

function validatePassword (pw, realpw) {
  return bcrypt.compare(pw, realpw);
}

function hashPassword (password) {
  return bcrypt.hash(password, 10);
}

const basicStrategy = new BasicStrategy((username, password, callback) => {
  let user;
  knex('users')
    .select()
    .where('email', username)
    .then(_user => {
      console.log(_user);
      user = _user[0];
      if (!user) {
        return callback(null, false, {message: 'Incorrect username'});
      }
      return validatePassword(password, user.password);
    })
    .then(isValid => {
      if (!isValid) {
        return callback(null, false, {message: 'Incorrect password'});
      }
      else {
        return callback(null, user)
      }
    });
});

passport.use(basicStrategy);
router.use(passport.initialize());

router.post('/api/users', (req, res) => {
  if (!req.body) {
    return res.status(400).json({message: 'No request body'});
  }

  if (!('email' in req.body)) {
    return res.status(422).json({message: 'Missing field: username'});
  }

  let {email, password} = req.body;

  if (typeof email !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: username'});
  }

  email = email.trim();

  if (email === '') {
    return res.status(422).json({message: 'Incorrect field length: username'});
  }

  if (!(password)) {
    return res.status(422).json({message: 'Missing field: password'});
  }

  if (typeof password !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: password'});
  }

  password = password.trim();

  if (password === '') {
    return res.status(422).json({message: 'Incorrect field length: password'});
  }

  knex('users')
    .count()
    .where('email', email)
    .then(results => {
      if (results[0].count > 0) {
        console.log('Username was taken')
        return Promise.reject({
          status: 422,
          message: 'username already taken'
        });
      }
      console.log('i tried to hash')
      return hashPassword(password)
    })
    .then(hash => {
      knex('users')
      .insert({
        email: email,
        password: hash
      })
      .returning(['email', 'userid'])
      .then(user => {
        return res.status(201).json(user);
      })
    })
    .catch(err => {
      console.log(err)
      if (err.status) {
        return res.status(err.status).json({message: err.message});
      }
      res.status(500).json({message: 'Internal server error'});
    })

});

router.post(`/api/users/login`, passport.authenticate('basic', {session: false}), (req, res) => {
    knex('users')
    .select(['userid', 'email'])
    .where('email', req.body.email)
    .then(results => {
        res.json(results);
    })
    .catch((error) => {
        console.error('ERROR:', error.message || error);
        res.status(500);
    })
  }
);


module.exports = {router, };
