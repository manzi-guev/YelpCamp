var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('landing');
});
var campgrounds = [
  {
    name: 'Solmon Creek',
    image:
      'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Granite Hill',
    image:
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Mountain Goats Rest',
    image:
      'https://i2-prod.cambridge-news.co.uk/incoming/article12958592.ece/ALTERNATES/s615/Campsites.jpg'
  },
  {
    name: 'Solmon Creek',
    image:
      'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Granite Hill',
    image:
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Mountain Goats Rest',
    image:
      'https://i2-prod.cambridge-news.co.uk/incoming/article12958592.ece/ALTERNATES/s615/Campsites.jpg'
  }
];
app.get('/campgrounds', (req, res) => {
  res.render('campgrounds', { campgrounds: campgrounds });
});

app.post('/campgrounds', function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCamp = { name: name, image: image };
  campgrounds.push(newCamp);
  res.redirect('/campgrounds');
});
app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Yelpcamp server has started`));
