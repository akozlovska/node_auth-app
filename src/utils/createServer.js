'use strict';

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { authRouter } = require('../routes/auth.router');
const { userRouter } = require('../routes/user.router');
const { errorMiddleware } = require('../middlewares/errorMiddleware');

require('dotenv').config();

function createServer() {
  const app = express();

  app.use(cors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
  }));
  app.use(express.json());
  app.use(cookieParser());

  app.use('/', authRouter);
  app.use('/user', userRouter);

  app.use(errorMiddleware);

  return app;
}

module.exports = { createServer };
