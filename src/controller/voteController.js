// eslint-disable-next-line import/no-extraneous-dependencies
const createError = require('http-errors');
const logger = require('../logger');
const { ContentModel } = require('../model/contentModel');
// eslint-disable-next-line import/no-extraneous-dependencies, import/order
const jwt = require('jsonwebtoken');

const addLike = (req, res, next) => {
	logger.info(req.params.id);

	jwt.verify(req.token, process.env.JWT_SECRET, (errorToken, authdata) => {
		if (errorToken) {
			next(createError(401, 'Your Session Has Expired'));
		} else {
			ContentModel.findByIdAndUpdate(
				req.params.id,
				{ $inc: { like: 1 } },
				{ new: true },
				(err, docs) => {
					if (err) {
						logger.warn(err);
						next(createError(400, 'Enter a Valid Content ID'));
					} else {
						logger.info('Updated User : ', docs);
						res.status(201).json({
							message: 'Liked',
							docs,
						});
					}
				}
			);
		}
	});
};

const disLike = (req, res, next) => {
	logger.info(req.params.id);

	jwt.verify(req.token, process.env.JWT_SECRET, (errorToken, authdata) => {
		if (errorToken) {
			next(createError(401, 'Your Session Has Expired'));
		} else {
			ContentModel.findByIdAndUpdate(
				req.params.id,
				{ $inc: { like: -1 } },
				{ new: true },
				(err, docs) => {
					if (err) {
						logger.warn(err);
						next(createError(400, 'Enter a Valid Content ID'));
					} else {
						logger.info('Updated User : ', docs);
						res.status(201).json({
							message: 'Disliked',
							docs,
						});
					}
				}
			);
		}
	});
};

module.exports = {
	addLike,
	disLike,
};
