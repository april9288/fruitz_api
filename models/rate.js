var mongoose = require('mongoose');

var Ratings = mongoose.model('Ratings', {
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	updated: { 
		type: Date, 
		default: Date.now 
	},
	lastrate: {
		type: Number
	},
	rate: {
		type: {},
	}
});


module.exports = {Ratings};