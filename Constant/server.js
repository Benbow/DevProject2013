var http = require('http'); // creation d'un serveur http.
var fs = require('fs'); // creation d'un serveur http.

map = require('./js/Map');

var terrain = new map.Start();

var test = terrain.largeur;

var server = http.createServer(function (request, response) {
	console.log(test);
	response.end();
});

server.listen(1337);