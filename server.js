const path = require('path'); // Require the path module
const express = require('express'); // Require the express module
const session = require('express-session'); // Require the express-session module
const exphbs = require('express-handlebars'); // Require the express-handlebars module
const routes = require('./controllers'); // Require the controllers module
const helpers = require('./utils/helpers'); // Require the helpers module

const sequelize = require('./config/connection'); // Require the connection module
const SequelizeStore = require('connect-session-sequelize')(session.Store); // Require the connect-session-sequelize module

const app = express(); // Initialize an express app
const PORT = process.env.PORT || 3001; // Set the port

const hbs = exphbs.create({ helpers }); // Create an instance of express-handlebars with the helpers object

const sess = {
    secret: 'Super secret secret', // Secret for the session
    cookie: {
        maxAge: 3600000, // Maximum age of the cookie
        httpOnly: true, // HTTP only flag
        secure: false, // Secure flag
        sameSite: 'strict' // Same site flag
    },
    resave: false, // Resave flag
    saveUninitialized: true, // Save uninitialized flag
    store: new SequelizeStore({ // Sequelize store for the session
        db: sequelize // Database connection
    })
};

app.use(session(sess)); // Use the session middleware

app.engine('handlebars', hbs.engine);  // Set the handlebars engine
app.set('view engine', 'handlebars'); // Set the view engine

app.use(express.json()); // Use the express.json middleware
app.use(express.urlencoded({ extended: true })); // Use the express.urlencoded middleware
app.use(express.static(path.join(__dirname, 'public'))); // Use the express.static middleware

app.use(routes); // Use the routes

sequelize.sync({ force: false }).then(() => { // Sync the database
    app.listen(PORT, () => console.log('Now listening')); // Start the server
});
