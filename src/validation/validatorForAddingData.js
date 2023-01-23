// eslint-disable-next-line import/no-extraneous-dependencies
const { check } = require('express-validator');

const checkerForAddingData = [
	check('postTitle', 'Must Have a Title').notEmpty(),
	check('postTitle', 'Lenght must be Greater than 4 Words').isLength({
		min: 4,
	}),
	check('postTitle', 'Lenght must be less than 70 Words').isLength({
		max: 70,
	}),
	check('postTitle', 'Title Must Be a String').isString(),
	check('postStory', 'Content Must Be Provided').notEmpty(),
	check('postStory', 'Content Must Be a String').isString(),
	check('postStory', 'Lenght Of content must be greater than 50').isLength({
		min: 50,
	}),
	check('postStory', 'Lenght Of content must be Less than 800').isLength({
		max: 800,
	}),
	check('pic', 'Must have PNG file').notEmpty(),
	check('pic', 'Enter PNG file Type only').custom((value, { req }) => {
		if (req.files.pic.mimetype === 'image/png') {
			return '.pdf'; // return "non-falsy" value to indicate valid data"
		}
		return false; // return "falsy" value to indicate invalid data
	}),
];

module.exports = {
	checkerForAddingData,
};
