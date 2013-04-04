var http = require('http'); // creation d'un serveur http.
var fs = require('fs'); // creation d'un serveur http.

map = require('./js/Map');

var test = new Object();
test.terrain = new map.Start();

var server = http.createServer(function (request, response) {
	console.log("test3");
});

server.listen(1337);