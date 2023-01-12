const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

//route to create a new comment
router.post('/create', withAuth, async (req, res) => {

    try {
        console.log("req body:", req.body);
        console.log("user id:", req.session.user_id);
        const commentData = await Comments.create({
            comment: req.body.comment,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        });
        console.log("comment data:",
            commentData);
        res.status(200).json(commentData);

    } catch (err) {
        console.log("Error:", err);
        res.status(500).json(err);
    }
});



module.exports = router;