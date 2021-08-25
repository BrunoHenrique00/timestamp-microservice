// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function formatDate(date){
  let dateFormated = new Date(date).toString()
  dateFormated = dateFormated.replace(' (Coordinated Universal Time)' , '')
  let newStr = dateFormated.split('')
  newStr.splice(3, 0, ',')
  return newStr.join("")
}

app.get("/api/:date", (req,res) => {
  let { date } = req.params
  // Check if date is unix
  if(date.match(/^[0-9]+$/) != null){
    date = parseInt(date)
    const unix = date
    const dateFormated = formatDate(date)
    if(dateFormated === "Invalid Date") return res.json({error: dateFormated})
    return res.json({
      unix,
      utc: dateFormated
    })
  }else{
    const dateFormated = formatDate(date)
    if(dateFormated === "Invalid Date") return res.json({error: dateFormated})
    return res.json({
      utc: dateFormated
    })
  }
  
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
