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
        console.log(posts);

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
        console.log("req params:", req.params);
        const postID = req.params.id
        console.log(postID);
        const postData = await Posts.findByPk(postID);
        console.log(postData);
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
        console.log(replyData);
        const post = postData.get({ plain: true });
        const replys = replyData.map((reply) => reply.get({ plain: true }));
        console.log (replys);
     
   
        res.render('post', {
            post,
            replys,
            logged_in: req.session.logged_in
        });
        req.session.save(() => {
            req.session.postId = postID;
        })
        console.log(post)
        // console.log(reply)
        
    } catch (err) { 
        res.status(500).json(err);
    }
});


//render dashboard old
// router.get('/dashboard', withAuth, async (req, res) => {
//     res.render('dashboard');
// });


module.exports = router;