var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  methodOverride = require('method-override'),
  Campground = require('../v3/models/campground'),
  Comment = require('../v3/models/comment'),
  User = require('./models/user'),
  seedDb = require('./seeds');

//requiring routes
var commentRoutes = require('./routes/comments'),
  campgroundRoutes = require('./routes/campgrounds'),
  authRoutes = require('./routes/index');

// seedDb(); // seed the database
mongoose.connect('mongodb://localhost/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(
  require('express-session')({
    secret: 'gegeman',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});
app.use('/campgrounds', campgroundRoutes);
app.use(authRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Yelpcamp server has started`));
