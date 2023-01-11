const router = require('express').Router();
const { Users } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await Users.findAll({

        });
        console.log(userData);
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json (err)
    }
})


//login route
router.post('/login', async (req, res) => {
  console.log(`username: ${req.body.username}`);
  console.log(`password: ${req.body.password}`);
  try {
    const userData = await Users.findOne({ where: { username: req.body.username } });
    console.log(userData);
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    
      // Redirect the client to the dashboard
      res.redirect('/');
    });

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});




//create new users
router.post('/signup', async (req, res) => {
  try {
    // Check if the username is already in use
    const existingUser = await Users.findOne({
        attributes: ['username'],
        where: {
          username: req.body.signup_username
        }
      });
      
    if (existingUser) {
        console.log("Existing user:", existingUser);
        console.log("Signup username:", req.body.signup_username);
        
      // If the username is already in use, send a response indicating that the username is taken
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Create a new user with the provided username and password
    const newUser = await Users.create({
      username: req.body.signup_username,
      password: req.body.signup_password,
    });

    // Save the new user to the session
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.username = req.body.signup_username;

      // Redirect the client to the dashboard
      res.redirect('/dashboard');
    });

    console.log(newUser);
  } catch (err) {
    // If there is an error, send a response with a 500 status code and the error object
    res.status(500).json(err);
  }
});


module.exports = router;

  
  

  //logout route
    router.post('/logout', (req, res) => {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    });



module.exports = router;
