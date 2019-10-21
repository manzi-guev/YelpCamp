var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

//show all campgrounds
router.get('/', (req, res) => {
  Campground.find({}, function(err, allcampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {
        campgrounds: allcampgrounds,
        currentUser: req.user
      });
    }
  });
});

//add new campground to DB
router.post('/', isLoggedIn, function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCamp = { name: name, image: image, description: desc, author: author };

  Campground.create(newCamp, function(err, newlycreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
});

// show form to create new campground
router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

//show more info about one campground
router.get('/:id', (req, res) => {
  Campground.findById(req.params.id)
    .populate('comments')
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        res.render('campgrounds/show', { campground: foundCampground });
      }
    });
});
//EDIT CAMPGROUND
router.get('/:id/edit', (req, res) => {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.render('campgrounds/edit', { campground: foundCampground });
    }
  });
});
router.put('/:id', (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(
    err,
    updatedCampground
  ) {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});
//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
module.exports = router;
