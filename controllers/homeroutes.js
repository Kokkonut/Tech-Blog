const router = require('express').Router();
const { Posts, Users } = require('../models');

//render homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Posts.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['username'],
                },
            ],
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);

        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {    
    if (req.session.logged_in) {    
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {    

    res.render('newUser');
});


module.exports = router;