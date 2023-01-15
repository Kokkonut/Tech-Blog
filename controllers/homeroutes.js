const router = require('express').Router();
const { Posts, Users, Comments} = require('../models');
const withAuth = require('../utils/auth');

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


//render dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Posts.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: Users,
                    attributes: ['username'],
                },
            ],
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }

});


//get posts by pk
router.get('/posts/:id', async (req, res) => {
    try {
        const postID = req.params.id
        const postData = await Posts.findByPk(postID, {
            include: [
                {
                    model: Users,
                    attributes: ['username'],
                },
            ],
        });
        const replyData = await Comments.findAll({
            order: [['comment_text', 'ASC']],
            include: [
                {
                    model: Users,
                    attributes: ['username'],
                },
            ],
            where: {
                post_id: postID
            }
        });

        const post = postData.get({ plain: true });
        const reply = replyData.map((reply) => reply.get({ plain: true }));

     
   
        res.render('post', {
            post,
            reply,
            logged_in: req.session.logged_in
        });
        req.session.save(() => {
            req.session.postId = postID;
        })

        
    } catch (err) { 
        res.status(500).json(err);
    }
});


//render dashboard old
// router.get('/dashboard', withAuth, async (req, res) => {
//     res.render('dashboard');
// });


module.exports = router;