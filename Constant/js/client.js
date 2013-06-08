(function($){

	var socket = io.connect('http://localhost:1337');
	var ppmap;
	var map = false;
	var User = {
		isPlanting : false,
		isBuilding : false
	};
	var Batiment = {
		name : '',
		sprite : {
			silo : {
				id : 1,
				decX : 0,
				decY : -150
			},
			grange : {
				id : 2,
				decX : -128,
				decY : -378
			},
			chambre : {
				id : 3,
				decX : -128,
				decY : -292
			}
		}
	}

	var Plantes = {
		name : '',
		sprite : {
			tomates : {
				id : 1,
				sprite_id : 2
			},
			mais : {
				id : 2,
				sprite_id : 13
			}
		}
	}


	$("#buttonRegister").click(function(){
		$("#div_login").slideUp('fast');	
		$("#div_register").fadeIn('slow');

		
	});
	//Lorsque l'on veut s'enregistrer'
	$('#registerform').submit(function(event)
	{
		event.preventDefault();
		//Envoie de l'action pour s'enregister'
		socket.emit('register', {
			mail : $("#newMail").val(),
			password : $("#newPassword").val(),
			pseudo : $("#newPseudo").val()
		});
		return false;
	});

	// Action lorsque le compte est cree
	socket.on('isRegistered', function(){
		$("#div_register").slideUp('fast');
		$("#div_login").fadeIn('fast');	
		
	});


	// Lorsque l'on submit notre formulaire de connection
	$('#loginform').submit(function(event)
	{
		event.preventDefault();
		//Envoie de l'action pour se connecter
		socket.emit('login', {
			mail : $("#mail").val(),
			password : $("#password").val()
		});
		return false;
	});

	/*
	*	Gestion des erreurs en popup.
	*/
	socket.on('error', function(error){
		$("#error").html(error);
		$("#error").fadeIn('slow');
		var t = setTimeout(function(){
			$("#error").fadeOut('slow');
		}, 3000);
	});

	socket.on('valid', function(valid){
		$("#valid").html(valid);
		$("#valid").fadeIn('slow');
		setTimeout(function(){
			$("#valid").fadeOut('slow');
		}, 3000);
	});

	

	// Action lorsque la connection reussie.
	socket.on('connected', function(user){
		$("#menu_username").html(user.pseudo);
		$("#div_login").slideUp('fast');
		$("#div_play").fadeIn('slow');
		$("#div_menu").fadeIn('slow');
		$("#div_begin").fadeIn('slow');
		$("#overlay").fadeIn('slow');
	});

	//Action lorsqu'on est admin
	socket.on('isAdmin', function(){
		$("#button_admin").fadeIn('fast');
	});

	//Lorsque l'on souhaite faire une nouvelle partie
	$("#new_game").click(function(){
		$("#liste_difficult").fadeIn('fast');
		$(this).parent().parent().slideUp('fast');
	});

	//Lorsque l'on cree une nouvelle partie
	$("#submit_newgame").click(function(){
		$("#div_begin").fadeOut('slow');
		$("#overlay").fadeOut('slow');
		socket.emit('newgame', {
			username : $("#menu_username").html(),
			difficulty : $('input[name=newgame_difficult]:checked').val()
		});
	});

	//Lorsque l'on continue notre partie
	$("#continue_game").click(function(){
		$("#div_begin").fadeOut('slow');
		$("#overlay").fadeOut('slow');
		socket.emit('continue_game', {
			username : $("#menu_username").html()
		});
	});

	socket.on('loadmap', function(map){
		loadmap(map);
	});

	var loadmap = function(map) {
		ppmap = $('#ppISO').pp3Diso({
	        map: 		 map.map,       // la map
	        mapId: 		 1,         // id de la map
	        tx: 		 256,       // dimension x des tuiles
	        ty: 		 128,       // dimension y des tuiles
	        prefix: 	 '',		// prefix avant les nom d'images
	        auto_size:   false,		// aggrandissement auto de la fenetre
	        mousewheel:  true,		// zoom avec la molette
	        zoom: 		 0.5,		// zoom par default
	        pathfinding: true,		// chemin auto pour le deplacement de l'avatar
	        onmoveavatar:function(x, y, mapid) {
	            mouseClick(x, y);// Fonction que l'on fait quand on clique pour bouger le perso
	        }
	    });

		//Mise en place des batiments quand tu load la map.
	    $.each(map.storage, function(index, value) {
	    	console.log(value.id);
	    	if(value.id == 1)
	    		Batiment.name = 'silo';
	    	else if (value.id == 2)
	    		Batiment.name = 'grange';
	    	else if (value.id == 3)
	    		Batiment.name = 'chambre';

		    ppmap.addBuilding(value.x, value.y, 'images/'+Batiment.name + '.png', Batiment.sprite[Batiment.name].decX, Batiment.sprite[Batiment.name].decY);
		});

		//Mise en place des batiments quand tu load la map.
	    $.each(map.all_user, function(index, value) {
		    ppmap.addObject(value.x, value.y, 'images/avatar.png', 0, 0, value.pseudo, value.pseudo, 'char_'+value.id);
		});

		ppmap.avatar(map.user.x, map.user.y, 'images/sprite.png', 15, -30, true, 4); //notre avatar
		ppmap.cursor('images/cursor-on.png', 'images/cursor-off.png', 0, 0); //notre curseur
	};

	socket.on('new_user_connected', function(data){
		ppmap.addObject(data.x, data.y, 'images/avatar.png', 0, 0, '', data.pseudo, 'char_'+data.id);
	});

	var mouseClick = function(x, y) {
		socket.emit('userMove', {
			x: x,
			y: y
		});
		if(User.isPlanting == true)
		{
			ppmap.addObject(x, y, 'images/'+Plantes.name + '.png', 0, 0);
			ppmap.changeOneMap(x,y,Plantes.sprite[Plantes.name].sprite_id);
			socket.emit('newCrops', {
				x: x,
				y: y,
				id: Plantes.sprite[Plantes.name].id
			});
		}
		else if(User.isBuilding == true)
		{
			ppmap.addBuilding(x, y, 'images/'+Batiment.name + '.png', Batiment.sprite[Batiment.name].decX, Batiment.sprite[Batiment.name].decY);
			socket.emit('newstorage', {
				x: x,
				y: y,
				id: Batiment.sprite[Batiment.name].id
			});
		}
	};


	$(".button_menu").click(function(){
		var type = $(this).attr('id').substr(12,$(this).attr('id').length);
		$('.menu_select_options').css('display','none');
		$("#menu_select_"+type+"_type").toggle('fast');
	});

	$(".button_menu_plantes").click(function(){
		User.isPlanting = true;
		User.isBuilding = false;
		var type = $(this).attr('id').substr(20,$(this).attr('id').length);
		Plantes.name = type;
		ppmap.changeCursor('images/'+Plantes.sprite[Plantes.name].sprite_id+'.png','images/cursor-off.png',0,0);
	});

	$(".button_menu_batiments").click(function(){
		User.isBuilding = true;
		User.isPlanting = false;
		var type = $(this).attr('id').substr(22,$(this).attr('id').length);
		Batiment.name = type;
		ppmap.changeCursor('images/'+type+'.png','images/cursor-off.png',Batiment.sprite[Batiment.name].decX,Batiment.sprite[Batiment.name].decY);
	});

	$(".end_menu_build").click(function(){
		User.isBuilding = false;
		User.isPlanting = false;
		ppmap.changeCursor('images/cursor-on.png','images/cursor-off.png',0,0);
		$(this).parent().toggle('fast');
	});

	

})(jQuery);