const router = require('express').Router();
const { Users } = require('../../models');
const { Posts } = require('../../models');

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



module.exports = router;