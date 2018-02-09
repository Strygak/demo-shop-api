const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
	name: { type: String, 
					default: '' },
	email: { type: String,  
					 unique: true, },
	password: { type: String,
	            default: '' },
	google: {
		id: {
			type: String,
			default: ''
		},
		token: {
			type: String,
			default: ''
		}
	},
	facebook: {
		id: {
			type: String,
			default: ''
		},
		token: {
			type: String,
			default: ''
		}
	}
})
		
userSchema.plugin(uniqueValidator, { message: 'emai is already taken.' });

const user = mongoose.model('User', userSchema)

module.exports = user