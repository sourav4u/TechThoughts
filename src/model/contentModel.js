const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
	content: {
		title: {
			type: String,
			required: true,
			maxlength: 70,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		story: {
			type: String,
			required: true,
		},
		postedBy: {
			id: String,
			username: String,
		},
	},
	like: { type: Number },
});

const ContentModel = mongoose.model('content', userSchema);

module.exports = {
	ContentModel,
};
