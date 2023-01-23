const mongoose = require('mongoose');

const { Schema } = mongoose;

const authSchema = new Schema({
	username: {
		type: String,
		required: true,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const AuthModel = mongoose.model('user', authSchema);

module.exports = {
	AuthModel,
};
