const express = require('express');
const bodyParser = require("body-parser");
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const tripRoutes = require('./routes/trip-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

// set up view engine
app.set('view engine', 'ejs');

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// excrypt cookie and sends it to the browser
app.use(cookieSession({
	//a day long
	maxAge:24 * 60 * 60 * 1000,
	keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Set up promises with mongoose
mongoose.Promise = global.Promise;

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
	console.log('connected to mongodb');
})
// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/trips', tripRoutes);


// create home route
app.get('/', (req, res) => {
	res.render('home', {user:req.user});
});

app.listen(3000, () => {
	console.log('app now listening for requests on port 3000');
})