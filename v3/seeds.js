var mongoose = require('mongoose'),
  Campground = require('../v3/models/campground'),
  Comment = require('../v3/models/comment');

var data = [
  {
    name: 'Clouds Rest',
    image:
      'https://cdn.vox-cdn.com/thumbor/-JoPdcgAuLTUsWiDZ62CX4wb33k=/0x0:5225x3479/1200x800/filters:focal(2195x1322:3031x2158)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg',
    description: 'Best place to settle and to relax'
  },
  {
    name: 'Moutain of Trees',
    image: 'http://ladybugforgirls.org/wp-content/uploads/2018/05/Camping.jpg',
    description: 'Lots of trees around here'
  },
  {
    name: 'Desert Mesa',
    image:
      'https://www.visitstaugustine.com/sites/default/files/styles/large/public/taxonomy/faver_dykes_st_augustine_florida.jpg',
    description: 'Best place to camp in California'
  }
];
function seedDb() {
  //Remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('removed campgrounds');
      //add a few campground
      data.forEach(function(seed) {
        Campground.create(seed, function(err, campground) {
          if (err) {
            console.log(err);
          } else {
            console.log('added a campground');
            //create comment
            Comment.create(
              {
                text: 'This place is great, but I wish there was internet',
                author: 'Homer'
              },
              function(err, comment) {
                if (err) {
                  console.log(err);
                } else {
                  campground.comments.push(comment);
                  campground.save();
                  console.log('created new comment');
                }
              }
            );
          }
        });
      });
    }
  });
}
module.exports = seedDb;
