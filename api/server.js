const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('../users/userRouter.js');
const authRouter = require('../auth/auth-router.js')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());


server.use('/api/users', userRouter);
server.use('/api', authRouter);


module.exports = server;