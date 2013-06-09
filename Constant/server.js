var http     = require('http'),
	fs 		 = require('fs'),
	jsdom    = require('jsdom').jsdom,
	myWindow = jsdom().createWindow(),
	$ 	     = require('jquery'),
	jq 	     = require('jquery').create(),
	jQuery   = require('jquery').create(myWindow),
	mysql    = require('mysql'),
	url = require('url');


var DB  	   = require("./js/class/DB");
var Map 	   = require("./js/class/Map");
var Stockages  = require("./js/class/Stockages");
var Plantes    = require("./js/class/Plantes");
var User 	   = require("./js/class/User");
var Tiles 	   = require("./js/class/Tiles");

var map = new Map();
//map.initialiseMap();

var bdd = new DB();
var connection = bdd.connection();

//Timer
var date = new Date();
var current_hour = date.getHours();
console.log(date + " heure: " +current_hour)

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
		//var userExist = user.existMail(dataRegister.mail);
		
		user.registerUser(dataRegister.mail,dataRegister.pseudo,dataRegister.password);
		socket.emit('isRegistered');
	});
		


	socket.on('userMove', function(data){
		user.move(data.x, data.y);
		socket.broadcast.emit('userMoveBroad',{
			'x'  : data.x,
			'y'	 : data.y,
			'id' : user.getId()
		});
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
		map.getIdTile(data.x,data.y,function(id){
			stockage.Add_Stockages(0,1,user.getId(),data.id,id);
		});
	});

	socket.on('userAttack',function(data){
		map.getIdTile(data.x,data.y,function(id){
			map.canAttack(id,user.getId(),function(result){
				if(result)
				{
					user.attack(id);
					socket.emit('valid', 'L\'attaque c\'est deroule avec succes !');
				}
				else
					socket.emit('error', "Vous ne pouvez attaquer un terrain qui vous appartient !");
			})
		});
	});
	socket.on('newCrops', function(data){
		crops = new Plantes();
		//TODO generate croissance and health
		map.getIdTile(data.x,data.y,function(id){
			crops.Add_Plantes(50,50,user.getId(),data.id,id);
		});
	});

	socket.on('watering', function(data){
		tile = new Tiles();
		//TODO generate croissance and health
		map.getIdTile(data.x,data.y,function(id){
			tile.Watering(id, user.getId(), function(cb){
				if(cb){
					socket.emit('valid', 'Watering Succesfull!!');
				}else{
					socket.emit('error', 'Not enough Water !');
				}
			});
		});
	});

	socket.on('fertilizing', function(data){
		tile = new Tiles();
		//TODO generate croissance and health
		map.getIdTile(data.x,data.y,function(id){
			tile.Fertilizing(id, user.getId(), function(cb){
				if(cb){
					socket.emit('valid', 'Fertilizing Succesfull!!');
				}else{
					socket.emit('error', 'Not enough Fertilizer !');
				}
			});
		});
	});

	socket.on('error', function(msg){
		socket.emit('error', msg);
	});

	socket.on('valid', function(msg){
		socket.emit('valid', msg);
	});

	socket.on('disconnect', function(socket){
		if(user.getId() != 0)
		{
			user.disconnect();			
			socket.broadcast.emit('userDisconnect',{
				'id' : user.getId()
			});
		}
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

//boucle de jeu
setInterval(function(){
	var d = new Date();
	var years   = d.getFullYear(),
		month   = (""+(d.getMonth() + 1)+"".length > 1) ? (d.getMonth() + 1) : '0'+(d.getMonth() + 1),
		day     = ((d.getDate()).length > 1) ? d.getDate() : '0'+d.getDate(),
		hours   = ((d.getHours()).length > 1) ? d.getHours() : '0'+d.getHours(),
		minute  = ((d.getMinutes()).length > 1) ? d.getMinutes() : '0'+d.getMinutes(),
		seconde = ((d.getSeconds()).length > 1) ? d.getSeconds() : '0'+d.getSeconds();
	var db_date = years+'-'+month+'-'+day+' '+hours+':'+minute+':'+seconde;

	Plantes.checkTimer(db_date);

	console.log(db_date);
}, 1000);
