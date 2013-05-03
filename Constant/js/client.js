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
		sprite : 0
	}

	// Lorsque l'on submit notre formulaire de connection
	$('#loginform').submit(function(event)
	{
		event.preventDefault();
		//Envoie de l'action pour se connecter
		socket.emit('login', {
			username : $("#username").val(),
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
	socket.on('connected', function(pseudo){
		$("#menu_username").html(pseudo);
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
12
	socket.on('loadmap', function(map){
		loadmap(map);
	});

	var loadmap = function(map) {
		ppmap = $('#ppISO').pp3Diso({
	        map: map,          		// la map
	        mapId:1,                // id de la map
	        tx:64,                  // dimension x des tuiles
	        ty:32,                  // dimension y des tuiles
	        auto_size:false,		// aggrandissement auto de la fenetre
	        mousewheel:true,		// zoom avec la molette
	        pathfinding:true,		// chemin auto pour le deplacement de l'avatar
	        onmoveavatar:function(x, y, mapid) {
	            mouseClick(x, y);// Fonction que l'on fait quand on clique pour bouger le perso
	        }
	    });
		ppmap.avatar(2, 2, 'images/avatar.png', 15, -30); //notre avatar
		ppmap.cursor('images/curseur_on.png', 'images/curseur_off.png', 0, 0); //notre curseur

	};

	var mouseClick = function(x, y) {
		console.log(x + " / " + y);
		if(User.isPlanting == true)
		{
			console.log("addPlante");
			ppmap.changeOneMap(x,y,3);
		}
		else if(User.isBuilding == true)
		{
			console.log("addBuilding");
			ppmap.addBuilding(x, y, 'images/'+Batiment.sprite, 0, 0);
		}
	};

	$(".button_menu").click(function(){
		var type = $(this).attr('id').substr(12,$(this).attr('id').length);
		$("#menu_select_"+type+"_type").toggle('fast');
	});

	$(".button_menu_plantes").click(function(){
		User.isPlanting = true;
		var type = $(this).attr('id').substr(20,$(this).attr('id').length);
		ppmap.changeCursor('images/map-3.png','images/curseur_off.png',0,0);
	});

	$(".button_menu_batiments").click(function(){
		User.isBuilding = true;
		var type = $(this).attr('id').substr(22,$(this).attr('id').length);
		Batiment.name = type;
		Batiment.sprite = type+".png";
		ppmap.changeCursor('images/'+type+'.png','images/curseur_off.png',0,0);
	});

	$(".end_menu_build").click(function(){
		User.isBuilding = false;
		User.isPlanting = false;
		ppmap.changeCursor('images/curseur_on.png','images/curseur_off.png',0,0);
	});

})(jQuery);