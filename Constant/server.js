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

var Map  = require("./js/class/Map");
var Stockages  = require("./js/class/Stockages");
var User = require("./js/class/User");

var map = new Map();
// map.initialiseMap();

//Creation du serveur http.
var server = http.createServer(function (req, res) { }).listen(1337);

var io = require('socket.io').listen(server);

// Action si un utilisateur arrive sur la page.
io.sockets.on('connection', function(socket){
	var user = new User();

	// Action quand un utilisateur essaie de se connecter.
	socket.on('login', function(datalogin){
		//On va chercher en bdd si le mail existe.
		user.loginUser(datalogin.mail,datalogin.password,function(socket_user){
			if(socket_user[1] != null) // true si le mail existe
            {
				if(socket_user[2] == datalogin.password)// On check le password
				{
					user.setPseudo(socket_user[0]);
					user.setId(socket_user[3]);
					user.connected();
					socket.emit('valid', 'Connected !');                
                    socket.emit('connected', {
                    	'pseudo': user.getPseudo()
                    });
                    map.getUserTile(user.getId(),function(user_tile){
	                    socket.broadcast.emit('new_user_connected',{
	                    	'pseudo' : socket_user[0],
	                    	'id'     : socket_user[3],
	                    	'x'      : user_tile.x,
	                    	'y'		 : user_tile.y
	                    });
                    });
                    if(socket_user[4]){
                    	if(socket_user[4] == 2){
                    		socket.emit('isAdmin');
                    	}
                    }
				}
				else
                    socket.emit('error', 'Wrong password !');
            }
            else
                socket.emit('error', 'Bad mail !');
		});
	});
		
	socket.on('register', function(dataRegister){
		user.registerUser(dataRegister.mail,dataRegister.pseudo,dataRegister.password)
		socket.emit('isRegistered');
	});
		


	socket.on('userMove', function(data){
		user.move(data.x, data.y);
	});

	socket.on('newgame', function(data){
		map.getMap(user,function(socket_map){
			socket.emit('loadmap', socket_map);
		});
	});

	socket.on('continue_game', function(data){
		map.getMap(user,function(socket_map){
			socket.emit('loadmap', socket_map);
		});
		map.getUserTile(user.getId(),function(user_tile){
			socket.broadcast.emit('new_user_connected',{
				'pseudo' : user.getPseudo(),
				'id'     : user.getId(),
				'x'      : user_tile.x,
				'y'		 : user_tile.y
			});
		});
	});

	socket.on('newstorage', function(data){
		stockage = new Stockages();
		console.log(0,1,user.getId(),data.id,getIdTile(data.x,data.y));
		//stockage.Add_Stockages(0,1,user.getId(),data.id,getIdTile(data.x,data.y));
	});

	socket.on('disconnect', function(socket){
		if(user.getId() != 0)
			user.disconnect();
	});


	//*********************************//
	//************ For Admin **********//
	//*********************************//

	socket.on('isAdmin', function(data){
		
	});

	socket.on('selectDB', function(data){
		connection.query('SELECT * FROM '+data.table, function(err, rows, fields) {
			if (err) throw err;
			if(rows.length > 0){
				var retour = new Array(data.table, rows);
				socket.emit('returnDB', retour);
				
			}else{
				var retour = new Array(data.table, 'empty');
				socket.emit('returnDB', retour);
			}
		});
	});

	socket.on('DeleteDB', function(data){
		connection.query('DELETE FROM '+data.table+' WHERE id='+data.id, function(err, rows, fields) {
			if (err) throw err;
		});

		connection.query('SELECT * FROM '+data.table, function(err, rows, fields) {
			if (err) throw err;
			if(rows.length > 0){
				var retour = new Array(data.table, rows);
				socket.emit('returnDB', retour);
				
			}else{
				var retour = new Array(data.table, 'empty');
				socket.emit('returnDB', retour);
			}
		});
	});

	socket.on('UpdateDB', function(data){
		console.log(data);
		if(typeof data.val == "string"){
			console.log("ok");
			connection.query('UPDATE '+data.table+' SET '+data.column+'="'+data.val+'" WHERE id='+data.id, function(err, rows, fields) {
				if (err) throw err;
			});
		}
		else{
			connection.query('UPDATE '+data.table+' SET '+data.column+'='+data.val+' WHERE id='+data.id, function(err, rows, fields) {
				if (err) throw err;
			});
		}

		connection.query('SELECT * FROM '+data.table, function(err, rows, fields) {
			if (err) throw err;
			if(rows.length > 0){
				var retour = new Array(data.table, rows);
				socket.emit('returnDB', retour);
				
			}else{
				var retour = new Array(data.table, 'empty');
				socket.emit('returnDB', retour);
			}
		});
	});


});
