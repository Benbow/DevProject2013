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
var Graine     = require("./js/class/Graine")



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
var connected = {};

var f = new Fruits();
f.updatePourissementFruits();

var t = new Tiles();
t.updateFertiliteAndHumidite();

var p = new Plantes();
var interval = setInterval(function(){
	p.updateCropsHealths(function(clb){
	});
},(60000));

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
					connected[(socket_user[3])] = socket.id;
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
		
	socket.on('checkGrainesOwned', function(ok){
		graine = new Graine();
		graine.checkGrainesOwned(user.getId(), function(cb){
			if(cb){
				socket.emit('cropsButton', cb);
			}
		});
	});

	socket.on('checkBatPrice', function(ok){
		stock = new Stockages();
		stock.checkBatPrice(function(cb){
			if(cb){
				socket.emit('BatButton', cb);
			}
		})
	});

	socket.on('GetUserProps', function(ok){
		user.GetUserProps(user.getId(), function(cb){
			if(cb){
				socket.emit('user_props', cb);
			}
		});
	})

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

	socket.on('getTileInfos', function(data){
		tile = new Tiles();
		tile.getTileInfos(data.x, data.y, function(cb){
			if(cb){
				if(cb.isEmpty == 0){
					socket.emit('showTileInfos', {
						type : 'empty',
						user_id : user.getId(),
						tile : cb
					});
				}else if(cb.isEmpty == 1){
					plantes = new Plantes();
					plantes.getInfosPlantes(cb.id, function(plante){
						if(plante){
							socket.emit('showTileInfos', {
								type : 'plante',
								user_id : user.getId(),
								tile : cb,
								plante : plante
							});
						}
					});
				}else if(cb.isEmpty == 2){
					bat = new Stockages();
					bat.getInfosStock(cb.id, function(batiment){
						if(batiment){
							socket.emit('showTileInfos', {
								type : 'batiment',
								user_id : user.getId(),
								tile : cb,
								batiment : batiment
							});
						}
					});
				}
			}
		})
	});

	socket.on('newstorage', function(data){
		stockage = new Stockages();
		tile = new Tiles();
		if(data.id == 1){
			map.getIdTile(data.x,data.y,function(id){
				tile.checkEmpty(id, function(cb){
					if(cb){
						user.checkMoneyForStockages(user.getId(), data.id, function(ok){
							if(ok){
								stockage.Add_Stockages(1,user.getId(),data.id,id);
								socket.emit('validStorage', {
									x : data.x,
									y : data.y
								});	
							}else{
								socket.emit('error', 'Not enough Gold !');
							}
						});
					}else{
						socket.emit('error', 'Not an Empty Tile !');
					}
				});
			});
		}else if(data.id == 2){
			map.getIdTile(data.x,data.y,function(id1){
				tile.checkEmpty(id1, function(cb1){
					if(cb1){
						map.getIdTile(data.x-1,data.y,function(id2){
							tile.checkEmpty(id2, function(cb2){
								if(cb2){
									map.getIdTile(data.x,data.y-1,function(id3){
										tile.checkEmpty(id3, function(cb3){
											if(cb3){
												map.getIdTile(data.x-1,data.y-1,function(id4){
													tile.checkEmpty(id4, function(cb4){
														if(cb4){
															user.checkMoneyForStockages(user.getId(), data.id, function(ok){
																if(ok){
																	stockage.Add_Stockages(1,user.getId(),data.id,id1);
																	stockage.Add_StockagesWithOrigin(1, user.getId(), data.id, id2, id1);
																	stockage.Add_StockagesWithOrigin(1, user.getId(), data.id, id3, id1);
																	stockage.Add_StockagesWithOrigin(1, user.getId(), data.id, id4, id1);
																	socket.emit('validStorage', {
																		x : data.x,
																		y : data.y
																	});
																	socket.emit('validStorageOrigin', {
																		x : data.x-1,
																		y : data.y
																	});
																	socket.emit('validStorageOrigin', {
																		x : data.x,
																		y : data.y-1
																	});
																	socket.emit('validStorageOrigin', {
																		x : data.x-1,
																		y : data.y-1
																	});
																}else{
																	socket.emit('error', 'Not enough Gold !');
																}
															});
														}
														else{
															socket.emit('error', 'Not an Empty Tile !');
														}
													});
												});
											}else{
												socket.emit('error', 'Not an Empty Tile !');
											}
										});
									});
								}else{
									socket.emit('error', 'Not an Empty Tile !');
								}
							});
						});
					}else{
						socket.emit('error', 'Not an Empty Tile !');
					}
				});
			});
		}else if(data.id == 3){
			map.getIdTile(data.x,data.y,function(id1){
				tile.checkEmpty(id1, function(cb1){
					if(cb1){
						map.getIdTile(data.x-1,data.y,function(id2){
							tile.checkEmpty(id2, function(cb2){
								if(cb2){
									map.getIdTile(data.x,data.y-1,function(id3){
										tile.checkEmpty(id3, function(cb3){
											if(cb3){
												map.getIdTile(data.x-1,data.y-1,function(id4){
													tile.checkEmpty(id4, function(cb4){
														if(cb4){
															map.getIdTile(data.x,data.y-2,function(id5){
																tile.checkEmpty(id5, function(cb5){
																	if(cb5){
																		map.getIdTile(data.x-1,data.y-2,function(id6){
																			tile.checkEmpty(id6, function(cb6){
																				if(cb6){
																					user.checkMoneyForStockages(user.getId(), data.id, function(ok){
																						if(ok){
																							stockage.Add_Stockages(1,user.getId(),data.id,id1);
																							stockage.Add_StockagesWithOrigin(1, user.getId(), data.id, id2, id1);
																							stockage.Add_StockagesWithOrigin(1, user.getId(), data.id, id3, id1);
																							stockage.Add_StockagesWithOrigin(1, user.getId(), data.id, id4, id1);
																							stockage.Add_StockagesWithOrigin(1, user.getId(), data.id, id5, id1);
																							stockage.Add_StockagesWithOrigin(1, user.getId(), data.id, id6, id1);
																							socket.emit('validStorage', {
																								x : data.x,
																								y : data.y
																							});
																							socket.emit('validStorageOrigin', {
																								x : data.x-1,
																								y : data.y
																							});
																							socket.emit('validStorageOrigin', {
																								x : data.x,
																								y : data.y-1
																							});
																							socket.emit('validStorageOrigin', {
																								x : data.x-1,
																								y : data.y-1
																							});
																							socket.emit('validStorageOrigin', {
																								x : data.x,
																								y : data.y-2
																							});
																							socket.emit('validStorageOrigin', {
																								x : data.x-1,
																								y : data.y-2
																							});
																						}else{
																							socket.emit('error', 'Not enough Gold !');
																						}
																					});
																				}else{
																					socket.emit('error', 'Not an Empty Tile !');
																				}
																			});
																		});
																	}else{
																		socket.emit('error', 'Not an Empty Tile !');
																	}
																});
															});
														}else{
															socket.emit('error', 'Not an Empty Tile !');
														}
													});
												});
											}else{
												socket.emit('error', 'Not an Empty Tile !');
											}
										});
									});
								}else{
									socket.emit('error', 'Not an Empty Tile !');
								}
							});
						});
					}else{
						socket.emit('error', 'Not an Empty Tile !');
					}
				});
			});
		}
	});

	socket.on('newTileSelectConquet',function(value){
		map.getIdTile(value.x,value.y,function(id){
			saveTiles.push({
				'x': value.x,
				'y': value.y,
				'id': id
			});
		});
	});

	socket.on('newTileSelectAttack',function(value){
		map.getIdTile(value.x,value.y,function(id){
			map.getOwnerTile(id,function(owner){
				saveTiles.push({
					'x': value.x,
					'y': value.y,
					'id': id,
					'owner': owner
				});
			});
		});
	});

	socket.on('userConquer',function(check){
		if(check)
		{
			user.getTimerConquet(function(timer){
				setTimeout(function(){
					$.each(saveTiles,function(index, value){
						user.conquet(value.id);
						newOptions = {
							'type': 'conquer',
							'user_id': user.getId()
						};
						updateTile(value.x, value.y, newOptions);
						socket.emit('valid', 'La conquete s\'est deroule avec succes !');

					});
					user.updateLevel(saveTiles.length, function(cb){
						if(cb){
							user.checkLevel(function(cb2){
								user.GetUserProps(user.getId(), function(cb){
									if(cb2){
										socket.emit('user_props', cb);
									}
								});
							});
						}
					})
					saveTiles = new Array();
				},timer*1000);
			});
		}
	});

	socket.on('userAttackTileBlink',function(data){
		io.sockets.socket((connected[data.user_id])).emit('error', 'You are attacked !');
		io.sockets.socket((connected[data.user_id])).emit('tileBlink', {
			'infos':data.infos
		});
	})

	socket.on('userAttack',function(enemi){
		if(enemi > 0)
		{
			setTimeout(function(){
				user.combat()
				$.each(saveTiles,function(index, value){
					user.attack(value.id);
					newOptions = {
						'type': 'attack',
						'user_id': user.getId(),
						'enemi': enemi
					};
					updateTile(value.x, value.y, newOptions);
					socket.emit('valid', 'L\'attaque c\'est deroule avec succes !');
				});
				saveTiles = new Array();
			},10000);
		}
	});

	socket.on('newCrops', function(data){
		crops = new Plantes();
		tile = new Tiles();
		//TODO generate croissance and health
		map.getIdTile(data.x,data.y,function(id){
			tile.checkEmpty(id, function(cb){
				if(cb){
					map.getInfosTile(id,function(infos){
						crops.Add_Plantes(0,user.getId(),data.id,infos.id,infos.humidite,infos.fertilite, function(ok){
							var graine = new Graine();
							graine.checkGrainesOwned(user.getId(), function(cb2){
								if(cb2){
									socket.emit('cropsButton', cb2);
								}
							});
						});
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
						socket.emit('validCrops', {
							x : data.x,
							y : data.y
						});
					});
				}else{
					socket.emit('error', 'Not an Empty Tile !');
				}
				
			});
			
		});
	});

	socket.on('watering', function(data){
		tile = new Tiles();
		//TODO generate croissance and health
		map.getIdTile(data.x,data.y,function(id){
			tile.Watering(id, user.getId(), function(cb){
				if(cb){
					crop = new Plantes();
					crop.updateCropsHealths(function(ok){
						socket.emit('valid', 'Watering Succesfull!!');
					});
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
					crop = new Plantes();
					crop.updateCropsHealths(function(ok){
						socket.emit('valid', 'Fertilizing Succesfull!!');
					});
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
						var po = c.fruits_spec.poids*cb.nb;
						var d = {
							nom : c.fruits_spec.name,
							nb : cb.nb,
							prix : p, 
							fruit_id : cb.fruit,
							poids : po,
							pourissement : c.fruits_spec.stockage_time
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
		s.GetMyStockages(user.getId(), data.nb, data.poids, function(cb){
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

	socket.on('achat_graine_tomate', function(data){
		graine = new Graine;
		graine.buyGraine(data.nb, user.getId(), data.graines_spec_id, function(cb){
			graine.checkGrainesOwned(user.getId(), function(cb2){
				if(cb2){
					socket.emit('cropsButton', cb2);
					socket.emit('valid', cb.nb+ ' graines de tomates on bien ete achete');
				}
			});
		});
	});

	socket.on('storeCrops', function(data){
		fruit = new Fruits;
		fruit.storeFruits(user.getId(), data.stor_id, data.fruit_id, data.nb, data.poids, data.stor_type, data.time, function(cb){
			socket.emit('valid', ''+cb.nb+' Fruits stored');
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
					socket.emit('valid', 'Crops Succesfully destroyed');
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
				if(cb.type == 1){
					socket.emit('destroyBuilding', {
						x: data.x,
						y: data.y
					});
					socket.emit('valid', 'Building Succesfully destroyed');
				}else if(cb.type == 2){

					tile.DestroyBuildingComplex(cb.id, function(ok){
							map.getCoordTile(cb.id,function(coord){
								socket.emit('destroyBuilding', {
								x: coord.x,
								y: coord.y
							});
							socket.emit('destroyBuilding', {
								x: coord.x-1,
								y: coord.y
							});
							socket.emit('destroyBuilding', {
								x: coord.x,
								y: coord.y-1
							});
							socket.emit('destroyBuilding', {
								x: coord.x-1,
								y: coord.y-1
							});
							socket.emit('valid', 'Building Succesfully destroyed');
						});
					});
				}else if(cb.type == 3){
					tile.DestroyBuildingComplex(cb.id, function(ok){
							map.getCoordTile(cb.id,function(coord){
								socket.emit('destroyBuilding', {
								x: coord.x,
								y: coord.y
							});
							socket.emit('destroyBuilding', {
								x: coord.x-1,
								y: coord.y
							});
							socket.emit('destroyBuilding', {
								x: coord.x,
								y: coord.y-1
							});
							socket.emit('destroyBuilding', {
								x: coord.x-1,
								y: coord.y-1
							});
							socket.emit('destroyBuilding', {
								x: coord.x,
								y: coord.y-2
							});
							socket.emit('destroyBuilding', {
								x: coord.x-1,
								y: coord.y-2
							});
							socket.emit('valid', 'Building Succesfully destroyed');
						});
					});
				}else{
					socket.emit('error', 'Not a Building !');
				}
			});
		});
	});

	socket.on('showBuildingProps', function(data){
		stockages = new Stockages();
		map.getIdTile(data.x,data.y,function(id){
			stockages.GetInfos(user.getId(), id, function(cb){
				if(cb){
					socket.emit('DisplayBuildingProps', {
						stockages : cb.stockages,
						stockages_spec : cb.stockages_spec,
						fruits : cb.fruits,
						fruits_spec : cb.fruits_spec
					});
				}else{
					socket.emit('error', 'Empty Building !');
					socket.emit('hideBuildingProps', 'ok');
				}
			});
		});
	});

	socket.on('showBuildingPropswithId', function(id){
		stockages = new Stockages();
		stockages.GetInfos(user.getId(), id, function(cb){
			if(cb){
				socket.emit('DisplayBuildingProps', {
					stockages : cb.stockages,
					stockages_spec : cb.stockages_spec,
					fruits : cb.fruits,
					fruits_spec : cb.fruits_spec
				});
			}else{
				socket.emit('error', 'Empty Building !');
				socket.emit('hideBuildingProps', 'ok');
			}
		});
	});

	socket.on('sell_fruit', function(data){
		var fruit = new Fruits();
		fruit.SellFruit(data.fruit_id, data.stockage_id, data.poids, data.prix, user.getId(), function(cb){
			socket.emit('valid', 'Fruit Sell');
			socket.emit('RefreshBuildingProps', 'ok');
		});
	});

	socket.on('drop_fruit', function(data){
		var fruit = new Fruits();
		fruit.DropFruit(data.fruit_id, data.stockage_id, data.poids, function(cb){
			socket.emit('valid', 'Fruit Dropped');
			socket.emit('RefreshBuildingProps', 'ok');
		});
	});

	socket.on('drop_all_dead_fruits', function(data){
		var fruit = new Fruits();
		fruit.DropAllDeadFruit(user.getId(), data.stockage_id, function(ok){
			if(ok){
				socket.emit('valid', 'Fruits Dropped');
				var upd = setInterval(function(){
		            socket.emit('RefreshBuildingProps', 'ok');
		            clearInterval(upd);
		        },(2000));
				
			}else{
				socket.emit('valid', 'Building Clear');
			}
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
