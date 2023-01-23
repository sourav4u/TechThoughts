const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const fileUpload = require('express-fileupload');
// eslint-disable-next-line import/no-extraneous-dependencies
const { homeRouter } = require('./routes/homeRoutes');
const { adminRouter } = require('./routes/adminRoutes');
const { authRouter } = require('./routes/authRoutes');
const { addContentRouter } = require('./routes/addDataRoutes');
const { notFound } = require('./errorHandler/notFound');
const { errorHanlding } = require('./errorHandler/errorHandler');
const logger = require('./logger');
const { voteRouter } = require('./routes/voteRoutes');
const { redisConnect } = require('./util/redis');

require('dotenv').config();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(
	fileUpload({
		useTempFiles: true,
	})
);

app.use('/', homeRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/add', addContentRouter);
app.use('/vote', voteRouter);

app.use(notFound);
app.use(errorHanlding);

module.exports = {
	app,
};
