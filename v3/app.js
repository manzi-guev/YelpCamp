var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);
// Campground.create(
//   {
//     name: 'Granite Hill',
//     image:
//       'https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
//     description:
//       'This is a huge granite hill, no bathrooms, no water. Beautiful granite!!'
//   },
//   function(err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('NEWLY CREATED CAMPGROUND: ');
//       console.log(campground);
//     }
//   }
// );
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
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render('show', { campground: foundCampground });
    }
  });
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Yelpcamp server has started`));
