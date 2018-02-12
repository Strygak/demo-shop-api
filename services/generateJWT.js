const jwt = require('jsonwebtoken');
const config = require('../config/index');

function generateJWT(id) {
	return jwt.sign({ id: id }, config.secret, { expiresIn: 86400 });
}

module.exports = generateJWT;