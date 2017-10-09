var express = require('express'),
    twitter = require('./twitter.js'), // this require() will log an error if you don't have your .env file setup correctly
    grammar = require('./tracery.js').grammar;

var app = express();

app.use(express.static('public')); // serve static files like index.html http://expressjs.com/en/starter/static-files.html

function generateStatus() {
  // Generate a new tweet using our grammar
  return grammar.flatten("#origin#"); // make sure an "origin" entry is in your grammar.json file
}

app.all("/tweet", function (request, response) { // send a GET or POST to /tweet to trigger a tweet http://expressjs.com/en/starter/basic-routing.html
  var newStatus = generateStatus();

  console.log("Got a hit!");
  if (twitter.tryToTweet(newStatus)){ // Some things could prevent us from tweeting. Find out more in twitter.js
    response.sendStatus(200);  // We successfully tweeted
  } else {
    response.sendStatus(500); // Something prevented us from tweeting
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

console.log("Here are some example statuses: ");
for (var i = 0; i < 5; i++) {
  console.log(`✨ ${generateStatus()}`);
}