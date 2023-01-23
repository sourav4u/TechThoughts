// eslint-disable-next-line import/no-extraneous-dependencies
const createError = require('http-errors');
const logger = require('../logger');
const { ContentModel } = require('../model/contentModel');
const { client } = require('../util/redis');

const getHome = (req, res, next) => {
	ContentModel.find(
		{},
		[],
		{ sort: { like: 'descending' } },
		async (err, docs) => {
			if (err) {
				logger.warn(err);
				next(createError(500, 'Internal server Error!'));
			} else {
				const newData = JSON.stringify(docs);
				await client.set('home', newData, { PX: 30000 });
				// await client.setEx('home', 5);
				res.status(200).json(docs);
			}
		}
	);
};

module.exports = {
	getHome,
};
