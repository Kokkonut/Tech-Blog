const router = require('express').Router();
const { Users } = require('../../models');

//login route
router.post('/login', async (req, res) => {
    try {
        const userData = await Users.findOne({ where: { username: req.body.username}});

        if (!userData) {
            res
                .status(400)
                .json('Incorrect username or password please try again');
            return;
        }

        const  validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json('Incorrect password, please try again');
            return;
        }

        req.session.save(() => {
            req.session.logged_in = true;
            // req.session.username = userData.username;

            res.redirect('/');
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


//create new users
router.post('/signup', async (req, res) => {
    try {
        const newUser = await Users.create({
            username: req.body.signup_username,
            password: req.body.signup_password
        });

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.save = req.body.signup_username;

            res.redirect('/');

            
        })

    } catch (err) {
        res.status(500).json (err);
    } 
})


module.exports = router;
