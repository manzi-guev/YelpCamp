var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  Campground = require('../v3/models/campground'),
  mongoose = require('mongoose'),
  seedDb = require('./seeds');

seedDb();
mongoose.connect('mongodb://localhost/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
});
app.get('/campgrounds', (req, res) => {
  Campground.find({}, function(err, allcampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { campgrounds: allcampgrounds });
    }
  });
});

app.post('/campgrounds', function(req, res) {
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
app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});
app.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id)
    .populate('comments')
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        res.render('show', { campground: foundCampground });
      }
    });
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Yelpcamp server has started`));
