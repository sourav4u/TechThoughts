const createError = require('http-errors');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-extraneous-dependencies
const { validationResult } = require('express-validator');
const { AuthModel } = require('../model/authModel');
const logger = require('../logger/index');

const postSignUp = (req, res, next) => {
	const errorInValidation = validationResult(req);
	if (!errorInValidation.isEmpty()) {
		logger.info(errorInValidation.errors);
		next(
			createError(
				400,
				errorInValidation.errors[0].msg || errorInValidation.errors.msg
			)
		);
	} else {
		bcrypt
			.hash(req.body.password, 7)
			.then((hashedPass) => {
				const data = new AuthModel({
					username: req.body.username,
					email: req.body.email,
					password: hashedPass,
				});

				data.save()
					.then((val) => {
						res.status(201).json({
							message: 'New User Created',
							val,
						});
					})
					.catch((err) => {
						logger.info(err);
						next(
							createError(
								500,
								'Internal Server Error & Something Went Worng'
							)
						);
					});
			})
			.catch((error) => {
				logger.info(error);
				next(
					createError(
						500,
						'Internal Server Error & Something Went Worng'
					)
				);
			});
	}
};

const postLogin = (req, res, next) => {
	const errorInValidation = validationResult(req);
	if (!errorInValidation.isEmpty()) {
		logger.info(errorInValidation.errors);
		next(
			createError(
				400,
				errorInValidation.errors[0].msg || errorInValidation.errors.msg
			)
		);
	} else {
		AuthModel.findOne({ email: req.body.email }, (err, docs) => {
			if (err) {
				logger.warn(err);
				next(
					createError(
						500,
						'Internal Server Error & Something Went Worng'
					)
				);
			} else {
				logger.info(docs);
				if (docs === null) {
					next(createError(400, 'User Not Found'));
				} else {
					bcrypt
						.compare(req.body.password, docs.password)
						.then((value) => {
							if (value) {
								const obj = {
									username: docs.username,
									password: docs.password,
									id: docs.id,
								};
								jwt.sign(
									obj,
									process.env.JWT_SECRET,
									{ expiresIn: '15m' },
									(tokenError, token) => {
										if (tokenError) {
											res.json({
												docs,
												value,
												tokenError,
											});
										}
										res.status(200).json({
											docs,
											isUser: value,
											token,
										});
									}
								);
							} else {
								next(createError(400, 'Incorrect Password!'));
							}
						});
				}
			}
		});
	}
};

module.exports = {
	postSignUp,
	postLogin,
};
