var http     = require('http'),
	fs 		 = require('fs'),
	jsdom    = require('jsdom').jsdom,
	myWindow = jsdom().createWindow(),
	$ 	     = require('jquery'),
	jq 	     = require('jquery').create(),
	jQuery   = require('jquery').create(myWindow),
	mysql    = require('mysql'),
	url = require('url');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'toor',
  database : 'farmDB',
});

connection.connect();


map = require('./js/Map');


var terrain = new map.Start();

var test = terrain.largeur;

var server = http.createServer(function (req, res) {
    // var page = url.parse(req.url).pathname;
    // if (page == '/') {
    // 	res.writeHead(200, {"Content-Type": "text/html"});
    //     res.write(fs.readFileSync(__dirname + '/index.html'));
    // }
    // else if (page == '/login') {
    // 	res.writeHead(200, {"Content-Type": "text/html"});
    //     res.write(fs.readFileSync(__dirname + '/index.html'));
    // }
    // else if (page == '/logout') {
    // 	res.writeHead(200, {"Content-Type": "text/html"});
    //     res.write(fs.readFileSync(__dirname + '/index.html'));
    // }
    // else
    // {
    //     res.write('Bad way !!!');    	
    // }
    // res.end();


});

server.listen(1337);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){

	socket.on('login', function(datalogin){
		connection.query('SELECT * FROM users WHERE username = "' + datalogin.username + '"', function(err, rows, fields) {
			if (err) throw err;
			if(rows.length > 0)
			{
				if(rows[0].password == datalogin.password)
				{
					io.sockets.emit('newuser', datalogin.username);
				}
				else
					console.log('fail');
			}
			else
				console.log('bad username/password');

		});
	});

});
