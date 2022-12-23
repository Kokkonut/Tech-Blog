const router = require('express').Router();
const { User } = require('../models');

//get routes to render login page
router.get('/', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }
    res.render('login');
}   
);


module.exports = router;