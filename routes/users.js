const express = require('express');
const router = express.Router();
const passport = require('../config/passport_config');
const userController = require('../controllers/userControllers');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.get('/google', passport.authenticate('google'));
router.get('/google/oauth2Callback', passport.authenticate('google', 
                              { failureRedirect: '/login' }), userController.googleOAuth);

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', 
                              { failureRedirect: '/login' }), userController.facebookOAuth);

router.get('/logout', (req, res) => {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;
