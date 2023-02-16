// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function handleDate(req, res, dateStr) {
  let date;  
  if (dateStr === "") {
    date = new Date();
  }
  else {
    let input = Number(dateStr);
    if (isNaN(input)) {
      input = dateStr;
    }
    date = new Date(input);    
  }
  const timeStamp = date.getTime();
  if (isNaN(timeStamp)) {
    res.json({ error: "Invalid Date" });
    return;
  }
  res.json({ unix: timeStamp, utc: date.toUTCString() });
}

// your first API endpoint... 
app.get("/api/:date", function(req, res) {
  let dateStr = req.params.date;
  handleDate(req, res, dateStr);
});

app.get("/api", function(req, res) {
    handleDate(req, res, "");
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
