const bcrypt = require('bcryptjs');
const Users = require('../users/user-model');

module.exports = function restricted(req, res, next) {

    if (req.session && req.session.user) {
       next();
    } else {
        console.log(req.session, req.session.user)
        res.status(401).json({ message: 'You shall not pass.'})
    }
}