const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model.js');


router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
        .then(savedUser => {
            res.status(201).json(savedUser)
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findByUsername({ username })
        .first()
        .then(user => {
            req.session.user = user; //cookie will get sent to client.
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}`})
            } else {
                res.status(401).json({ message: 'Invalid Credientials'})
            }
        })
});

router.get('/logout', (req, res ) => {
    if (req.session){
        req.session.destroy(err => {
            if (err) {
                res.json({ message: 'you could not be logged out.'})
            } else {
                res.status(200).json({ message: 'bye'})
            }
    }) 
    } else {
        res.status.json({ message: 'you were not logged in anyways'})
    }
})


module.exports = router;


///route api/login
///api/logout
///api/users