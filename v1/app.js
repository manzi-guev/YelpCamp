const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('landing');
});
app.get('/campgrounds', (req, res) => {
  const campgrounds = [
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
        'https://images.unsplash.com/photo-1539183204366-63a0589187ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    }
  ];
  res.render('campgrounds', { campgrounds: campgrounds });
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Yelpcamp server has started`));
