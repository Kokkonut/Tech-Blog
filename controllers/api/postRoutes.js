const router = require('express').Router();
const { Users, Comments, Posts } = require('../../models');


//route to render all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Posts.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['username']
                }
            ]
        });
        console.log(postData);
        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err);
    }
});

//route to render all posts from a single user
router.get('/userposts', async (req, res) => {
    try {
        const postData = await Posts.findAll({
            where: {
                username: req.session.username
            },
            include: [
                {
                    model: Users,
                    attributes: ['username']
                }
            ]
        });
        console.log(postData);
        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err);
    }
});

//route to create a new post
router.post('/create', async (req, res) => {
    try {
        console.log("req body:", req.body);
        console.log("user id:", req.session.user_id);
        const postData = await Posts.create({ 
            title: req.body.title,
            content: req.body.body,
            user_id: req.session.user_id,
        });
        console.log("post data:", postData);
        res.status(200).json(postData);

    } catch (err) {
        console.log("Error:", err);
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
            order: [['reply_body', 'ASC']],
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




module.exports = router;