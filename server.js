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

app.get("/api/:dateString", (req,res) => {
  const { dateString } = req.params;
	const timestamp = parseInt(dateString * 1, 10);
	const date = new Date(timestamp || dateString || Date.now());

	let result;
	if (isNaN(+date)) {
		result = { error: 'Invalid Date' };
	} else {
		result = {
			unix: date.getTime(),
			utc: date.toUTCString(),
		};
	}
	res.json(result);
  
})

app.get("/api", function (req, res) {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
