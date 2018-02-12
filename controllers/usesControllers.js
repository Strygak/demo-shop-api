const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport_config');
const config = require('../config/index');

function generateJWT(_id) {
	return jwt.sign({ id: _id }, config.secret, { expiresIn: 86400 });
}

exports.registerUser = (req, res) => {
	const hashedPassword = bcrypt.hashSync(req.body.password, 8);
	User.create({ name: req.body.name,
		            email: req.body.email,
		            password: hashedPassword }, (err, user) => {
		if (err) { 
			return res.status(500).send("There was a problem registering the user.");
		}
		res.status(200).send({ auth: true, token: generateJWT(user._id) });
	}); 
};

exports.loginUser = (req, res) => {
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
    res.status(200).send({ auth: true, token: generateJWT(user._id) });
  });
};

exports.googleOAuth = (req, res) => { res.send({ auth: true, token: generateJWT(req.user._id) }); };

exports.facebookOAuth = (req, res) => { res.send({ auth: true, token: generateJWT(req.user._id) }); };