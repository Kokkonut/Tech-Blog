const router = require('express').Router();

//render homepage
router.get('/', (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;