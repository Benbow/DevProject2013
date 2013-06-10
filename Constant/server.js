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
var Fruits_sp  = require("./js/class/Fruits_spec");
var Fruits 	   = require("./js/class/Fruits");

var map = new Map();
//map.initialiseMap();

var bdd = new DB();
var connection = bdd.connection();

//Timer
var date = new Date();
var current_hour = date.getHours();


var saveTiles = new Array();

//Creation du serveur http.
var server = http.createServer(function (req, res) { }).listen(1337);

var io = require('socket.io').listen(server);

// Action si un utilisateur arrive sur la page.
io.sockets.on('connection', function(socket){
	var user = new User();
	//user.lvl();

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

	socket.on('newTileSelectConquet',function(value){
		map.getIdTile(value.x,value.y,function(id){
			saveTiles.push({
				'x': value.x,
				'y': value.y,
				'id': id
			});
		});
	})

	socket.on('userConquer',function(check){
		if(check)
		{
			user.getTimerConquet(function(timer){
				setTimeout(function(){
					console.log(timer);
					$.each(saveTiles,function(index, value){
						user.conquet(value.id);
						newOptions = {
							'type': 'conquer',
							'user_id': user.getId()
						};
						updateTile(value.x, value.y, newOptions);
						socket.emit('valid', 'L\'attaque c\'est deroule avec succes !');
					});
				},timer*1000);
			});
		}
	});

	socket.on('newCrops', function(data){
		crops = new Plantes();
		//TODO generate croissance and health
		map.getIdTile(data.x,data.y,function(id){
			map.getInfosTile(id,function(infos){
				crops.Add_Plantes(50,user.getId(),data.id,infos.id,infos.humidite,infos.fertilite);
				var options = {
					'status' : 0,
					'graine_id' : data.id,
					'type' : 'update_status'
				}
				updateTile(data.x, data.y, options);
				crops.updatePlante(function(status, graine_id){
					var newOptions = {
						'status' : status,
						'graine_id' : graine_id,
						'type' : 'update_status'
					}
					updateTile(data.x, data.y, newOptions);
				});
			});
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

	socket.on('harvesting', function(data){
		tile = new Tiles();
		//TODO generate croissance and health
		map.getIdTile(data.x,data.y,function(id){
			tile.Harvesting(id, user.getId(), function(cb){
				if(cb.ok){
					socket.emit('valid', 'Harvesting Succesfull!!');
					socket.emit('destroyCrops', {
						x: data.x,
						y: data.y
					});
					fruit_spec = new Fruits_sp;
					fruit_spec.getFruitSpec(cb.fruit, function(c){
						var p = c.fruits_spec.prix_vente * cb.nb;
						var d = {
							nom : c.fruits_spec.name,
							nb : cb.nb,
							prix : p, 
							fruit_id : cb.fruit
						}
						socket.emit('instantSell', d);
					});
				}else{
					socket.emit('error', 'Not a Mature crop !');
				}
			});
		});
	});

	socket.on('instantSellConfirm', function(data){
		u = new User();
		u.SellCrop(user.getId(), data.prix, function(ok){
			//here, update l'affichage de l'argent du player
		});
	});

	socket.on('instantSellStack', function(data){
		s = new Stockages();
		s.GetMyStockages(user.getId(), data.nb, function(cb){
			if(cb.ok){
				socket.emit('chooseStorage', {
					data : data,
					stockages : cb.stock
				});
			}else{
				u = new User();
				u.SellCrop(user.getId(), data.prix, function(ok){
					//here, update l'affichage de l'argent du player
					socket.emit('error', 'Not Enough Storage ! You Sell it');
				});
			}
		});
	});

	socket.on('storeCrops', function(data){
		fruit = new Fruits;
		fruit.storeFruits(user.getId(), data.stor_id, data.fruit_id, data.nb, function(cb){
			socket.emit('valid', ''+cb.nb+' Crops stored');
		});
	});

	socket.on('destroyingCrops', function(data){
		tile = new Tiles();
		//TODO generate croissance and health
		map.getIdTile(data.x,data.y,function(id){
			tile.DestroyCrops(user.getId(), id, function(cb){
				if(cb){
					socket.emit('destroyCrops', {
						x: data.x,
						y: data.y
					});
					socket.emit('valid', 'Crops Suceesfully destroyed');
				}else{
					socket.emit('error', 'Not a Crop !');
				}
			});
		});
	});

	
	socket.on('destroyingBuilding', function(data){
		tile = new Tiles();
		//TODO generate croissance and health
		map.getIdTile(data.x,data.y,function(id){
			tile.DestroyBuilding(user.getId(), id, function(cb){
				if(cb){
					socket.emit('destroyBuilding', {
						x: data.x,
						y: data.y
					});
					socket.emit('valid', 'Building Suceesfully destroyed');
				}else{
					socket.emit('error', 'Not a Building !');
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

	socket.on('disconnect', function(id){
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

getTimeDb = function(){
	var d = new Date();
	var years   = d.getFullYear(),
		month   = ((d.getMonth() + 1).toString().length > 1) ? (d.getMonth() + 1) : '0'+(d.getMonth() + 1),
		day     = ((d.getDate()).toString().length > 1) ? d.getDate() : '0'+d.getDate(),
		hours   = ((d.getHours()).toString().length > 1) ? d.getHours() : '0'+d.getHours(),
		minute  = ((d.getMinutes()).toString().length > 1) ? d.getMinutes() : '0'+d.getMinutes(),
		seconde = ((d.getSeconds()).toString().length > 1) ? d.getSeconds() : '0'+d.getSeconds();
	var db_date = years+'-'+month+'-'+day+' '+hours+':'+minute+':'+seconde;

	return db_date;
};

updateTile = function(x,y,options){
    if(options.type == 'update_status'){
	    var sprite_id = options.graine_id+""+options.status;
	    Tiles.changeSprite(x,y,sprite_id);
	    io.sockets.emit('newTileSprite', {
	        'x':x,
	        'y':y,
	        'sprite_id': sprite_id
	    });
    }
    else if(options.type == 'conquer'){
	    io.sockets.emit('newTileConquer', {
	        'x':x,
	        'y':y,
	        'user_id': options.user_id
	    });
    }
};
