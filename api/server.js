const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session')
const userRouter = require('../users/userRouter.js');
const authRouter = require('../auth/auth-router.js')
const KnexSessionStore = require('connect-session-knex')(session);
const server = express();

const sessionConfig = {
    name: 'monkey',
    secret: 'keep it secret, keep it safe!!',
    cookie: {
        maxAge: 1000 * 30000000, //30minutes.
        secure: false, //needs to be true in production!!!!!!!
        httpOnly: true, //no javascript code on client will get access to cookie.
    },
    resave: false,
    saveUninitialized: false, //GDPR compliance laws against setting cookies automatically.  Should only be true in users allows it.
    store: new KnexSessionStore({
        knex: require('../database/dbConfig.js'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60,
   
      })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig))

server.use('/api/users', userRouter);
server.use('/api', authRouter);


module.exports = server;