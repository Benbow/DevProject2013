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
		console.log(user)
		$("#menu_username").html(user.pseudo);
		$("#div_login").slideUp('fast');
		$("#div_play").fadeIn('slow');
		$("#div_menu").fadeIn('slow');
		$("#div_begin").fadeIn('slow');
		$("#overlay").fadeIn('slow');
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
	    	if(value.id == 1)
	    		Batiment.name = 'silo';
	    	else if (value.id == 2)
	    		Batiment.name = 'grange';
	    	else if (value.id == 3)
	    		Batiment.name = 'chambre';

		    ppmap.addBuilding(value.x, value.y, 'images/'+Batiment.name + '.png', Batiment.sprite[Batiment.name].decX, Batiment.sprite[Batiment.name].decY);
		});

		ppmap.avatar(2, 2, 'images/sprite.png', 15, -30, true, 4); //notre avatar
		ppmap.cursor('images/cursor-on.png', 'images/cursor-off.png', 0, 0); //notre curseur
	};

	var mouseClick = function(x, y) {
		if(User.isPlanting == true)
		{
			ppmap.changeOneMap(x,y,2);
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
		$("#menu_select_"+type+"_type").toggle('fast');
	});

	$(".button_menu_plantes").click(function(){
		User.isPlanting = true;
		User.isBuilding = false;
		var type = $(this).attr('id').substr(20,$(this).attr('id').length);
		ppmap.changeCursor('images/2.png','images/cursor-off.png',0,0);
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