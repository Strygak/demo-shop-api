const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/index');
const User = require('../models/user');
const passport = require('../config/passport_config');

router.post('/register', (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  }, (err, user) => {
    if (err) { 
      return res.status(500).send("There was a problem registering the user.");
    }
    
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400
    });
    res.status(200).send({ auth: true, token: token });
  }); 
});

router.post('/login', (req, res) => {
  
  User.findOne({ email: req.body.email }, (err, user) => {
    
    if (err) { 
      return res.status(500).send('Error on the server.');
    }

    if (!user) { 
      return res.status(404).send('No user found.');
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) { 
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 
    });

    res.status(200).send({ auth: true, token: token });
  });
});

router.get('/google', passport.authenticate('google'));

router.get('/google/oauth2Callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {

    const token = jwt.sign({ id: req.user._id }, config.secret, {
      expiresIn: 86400 
    });

    res.send({ auth: true, token: token });
  }
);

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => { 
    const token = jwt.sign({ id: req.user._id }, config.secret, {
      expiresIn: 86400 
    });

    res.send({ auth: true, token: token });
  });

router.get('/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;
