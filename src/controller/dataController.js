// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-extraneous-dependencies
const createError = require('http-errors');
// eslint-disable-next-line import/no-extraneous-dependencies
const { body, validationResult } = require('express-validator');
const createHttpError = require('http-errors');
const logger = require('../logger');
const { ContentModel } = require('../model/contentModel');
const { cloudinary } = require('../util/cloudinary');
require('dotenv').config();

const postPost = (req, res, next) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (errorToken, authdata) => {
		if (errorToken) {
			next(createHttpError(401, 'Your Session Has Expired'));
		} else {
			const errorInValidation = validationResult(req);
			const file = req.files.pic;
			logger.info(file);
			if (!errorInValidation.isEmpty()) {
				next(createError(400, errorInValidation.errors[0].msg));
			} else {
				cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
					if (err) {
						logger.warn(`WAAR ${err}`);
						next(
							createError(
								500,
								'Internal Server Error API missing'
							)
						);
					} else {
						logger.info(authdata);

						const Data = new ContentModel({
							content: {
								title: req.body.postTitle, // maximum 70 Words
								imageUrl: result.secure_url,
								story: req.body.postStory, // Maximum 600 Words
								postedBy: {
									id: authdata.id,
									username: authdata.username,
								},
							},
							like: 0,
						});

						Data.save()
							.then((val) => {
								logger.info(val);
								res.status(202).json({
									newPost: val,
									// authdata,
								});
							})
							.catch((erro) => {
								logger.warn(`from ${erro}`);
							});

						// res.json(result);
					}
				});
			}
		}
	});
};

module.exports = {
	postPost,
};
