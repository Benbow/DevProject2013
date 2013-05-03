var http     = require('http'),
	fs 		 = require('fs'),
	jsdom    = require('jsdom').jsdom,
	myWindow = jsdom().createWindow(),
	$ 	     = require('jquery'),
	jq 	     = require('jquery').create(),
	jQuery   = require('jquery').create(myWindow),
	mysql    = require('mysql'),
	url = require('url');

//Connection a la base de donnees.
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'toor',
  database : 'farmDB',
});

connection.connect();

var ClassMap = require("./js/Map");
var map = ClassMap.Map();

map.setL("150");
console.log(map.getL());

//Creation du serveur http.
var server = http.createServer(function (req, res) { }).listen(1337);

var io = require('socket.io').listen(server);

// Action si un utilisateur arrive sur la page.
io.sockets.on('connection', function(socket){

	// Action quand un utilisateur essaie de se connecter.
	socket.on('login', function(datalogin){
		//On va chercher en bdd si le username existe.
		connection.query('SELECT * FROM Users WHERE pseudo = "' + datalogin.username + '"', function(err, rows, fields) {
			if (err) throw err;
			if(rows.length > 0) // true si le username existe
			{
				if(rows[0].password == datalogin.password) // On check le password
				{
					socket.emit('valid', 'Connected !');
					socket.emit('connected', datalogin.username);
				}
				else
					socket.emit('error', 'Wrong password !');
			}
			else
				socket.emit('error', 'Bad username !');

		});
	});

	socket.on('newgame', function(data){
		socket.emit('loadmap', '1,1,1,1,1,1,1,1,1,1:1,1,1,1,1,1,1,1,1,1:1,1,1,1,1,1,1,1,1,1:1,1,1,1,1,1,1,1,1,1:1,1,1,1,1,1,1,1,1,1:1,1,1,1,1,1,1,1,1,1:1,1,1,1,1,1,1,1,1,1:1,1,1,1,1,1,1,1,1,1:1,1,1,1,1,1,1,1,1,1:1,1,1,1,1,1,1,1,1,1');
	});

});
