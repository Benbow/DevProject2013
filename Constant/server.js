var http     = require('http'),
	fs 		 = require('fs'),
	jsdom    = require('jsdom').jsdom,
	myWindow = jsdom().createWindow(),
	$ 	     = require('jquery'),
	jq 	     = require('jquery').create(),
	jQuery   = require('jquery').create(myWindow),
	mysql    = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'toor',
  database : 'farmDB',
});

connection.connect();

connection.query('SELECT * FROM users WHERE id = 1', function(err, rows, fields) {
  if (err) throw err;

  console.log('Username : ', rows[0].username);
  console.log('Password : ', rows[0].password);
});

connection.end();

map = require('./js/Map');


var terrain = new map.Start();

var test = terrain.largeur;

var server = http.createServer(function (request, response) {
	response.end();
});

server.listen(1337);