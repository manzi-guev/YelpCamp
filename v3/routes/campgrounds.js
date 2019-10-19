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
router.post('/', function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCamp = { name: name, image: image, description: desc };
  Campground.create(newCamp, function(err, newlycreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
});

// show form to create new campground
router.get('/new', (req, res) => {
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
module.exports = router;
