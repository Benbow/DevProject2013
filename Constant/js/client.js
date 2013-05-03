(function($){

	var socket = io.connect('http://localhost:1337');
	var ppmap;
	var map = false;

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
	socket.on('connected', function(unsername){
		$("#menu_username").html(unsername);
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

	socket.on('loadmap', function(map){
		loadmap(map);
	});

	var loadmap = function(map) {
		ppmap = $('#ppISO').pp3Diso({
	        map: map,          // la map
	        mapId:1,                // id de la map
	        tx:64,                  // dimension x des tuiles
	        ty:32,                  // dimension y des tuiles
	        auto_size:false,
	        mousewheel:true,
	        pathfinding:true,
	        onmoveavatar:function(x, y, id) {
	            mouseClick(x, y, id);
	        }
	    });
		ppmap.avatar(2, 2, 'images/avatar.png', 15, -30);
		ppmap.cursor('images/curseur_on.png', 'images/curseur_off.png', 0, 0);

	};

var mouseClick = function(x, y, id) {
	console.log('test');
};

})(jQuery);