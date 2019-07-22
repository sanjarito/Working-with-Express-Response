const express = require('express');
const morgan = require('morgan');


const app = express();

const apps = require('./playstore.js');

app.use(morgan('common')); // let's see what 'common' format looks like

app.get('/apps', (req, res) => {

  const { search = "", sort } = req.query;
  let sortedList = []

  let results = apps
        .filter(app =>
            app
              .Genres
              .includes(search));

  if (results.length == 0) {
    return res
        .status(400)
        .send('Search query must be one of the following: Action, Puzzle, Strategy, Casual, Arcade, Card');
    } else {
      if (sort == "Rating"){
      sortedList = results.sort(function(a,b){
        return a.Rating - b.Rating
      })
    } else if (sort == "App") {
      sortedList = results.sort(function(a,b){
        let nameA = a.App.toUpperCase(); // ignore upper and lowercase
        let nameB = b.App.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      } else {
      sortedList = results
      }
  }

        res.json(sortedList)

  });




app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});
