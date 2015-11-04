/*var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // for parsing application/x-www-form-urlencoded


app.post('/save', function (req, res) {
	var pngdata = req.body.png_data,
		svgdata = req.body.filepath,
		business_id = req.body.business_id;
	
	// remove headers (data:,)
	var pngdataurl = new Buffer(pngdata, 'base64');
	var rawpng = new Buffer((pngdataurl + '').split(',')[1], 'base64');
	
	// decode svg
	var svg = new Buffer(svgdata, 'base64');
	
	fs.writeFile('images/' + business_id + '.png', rawpng, function (err) {
		if (err) throw err;
		console.log('Saved png!');
	});
	
	fs.writeFile('images/' + business_id + '.svg', svg, function (err) {
		if (err) throw err;
		console.log('Saved svg!');
	});
	
	res.send();
});

var server = app.listen(8082, function () {

});*/