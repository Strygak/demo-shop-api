const mongoose = require('mongoose');

const productShema = mongoose.Schema({
	title: String,
	price: Number,
	owner_id: String,
	create: { type: Date, default: Date.now } 
})

const product = mongoose.model('Product', productShema)

module.exports = product