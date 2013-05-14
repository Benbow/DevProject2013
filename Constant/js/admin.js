(function($){

	var socket = io.connect('http://localhost:1337');

	// incoming
	$("#button_admin").click(function(){
		$("#div_play").fadeOut('fast');
		$("#div_menu").fadeOut('fast');
		$("#div_begin").fadeOut('fast');
		$("#overlay").fadeOut('fast');

		$("#div_admin").fadeIn('fast');
		$(".menu_admin").fadeIn('fast');
		$(".menu_user").fadeOut('fast');
		$(".menu_content").fadeOut('fast');
		$(".pre_menu").fadeIn('slow');
		$(".menu_general").fadeIn('slow');

		$(".display_admin").fadeIn('fast');
		$(".display_admin .user").fadeOut('fast');
		$(".display_admin .contenu").fadeOut('fast');
		$(".display_admin .general").css('display', 'block');
		$(".display_admin .general div").css('display', 'none');
		$(".display_admin .general .Userlist").slideDown('slow');

		$(".pre_menu div").removeClass('pre_menu_current');
		$(".bouton_general").addClass("pre_menu_current");
		$(".menu_general div").removeClass('sub_menu_current');
		$(".menu_general .Userlist").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Users'
		});
		//console.log(users);
	});

	//go out
	$("#admin_back").click(function(){
		$("#div_admin").fadeOut('fast');

		$("#div_play").fadeIn('slow');
		$("#div_menu").fadeIn('slow');
		$("#div_begin").fadeIn('slow');
		$("#overlay").fadeIn('slow');
	});

	//pre menu action
	$(".bouton_general").click(function(){

		$(".menu_admin").fadeIn('fast');
		$(".menu_user").fadeOut('fast');
		$(".menu_content").fadeOut('fast');
		$(".pre_menu").fadeIn('slow');
		$(".menu_general").fadeIn('slow');

		$(".display_admin").fadeIn('fast');
		$(".display_admin .user").fadeOut('fast');
		$(".display_admin .contenu").fadeOut('fast');
		$(".display_admin .general").css('display', 'block');
		$(".display_admin .general div").css('display', 'none');
		$(".display_admin .general .Userlist").slideDown('slow');

		$(".bouton_user").removeClass('pre_menu_current');
		$(".bouton_content").removeClass('pre_menu_current');
		$(".bouton_general").addClass("pre_menu_current");
		$(".menu_general div").removeClass('sub_menu_current');
		$(".menu_general .Userlist").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Users'
		});
	});

	$(".bouton_user").click(function(){

		$(".menu_admin").fadeIn('fast');
		$(".menu_general").fadeOut('fast');
		$(".menu_content").fadeOut('fast');
		$(".pre_menu").fadeIn('slow');
		$(".menu_user").fadeIn('slow');

		$(".display_admin").fadeIn('fast');
		$(".display_admin .general").fadeOut('fast');
		$(".display_admin .contenu").fadeOut('fast');
		$(".display_admin .user").css('display', 'block');
		$(".display_admin .user div").css('display', 'none');
		$(".display_admin .user .Alliances").slideDown('slow');

		$(".bouton_user").addClass('pre_menu_current');
		$(".bouton_content").removeClass('pre_menu_current');
		$(".bouton_general").removeClass("pre_menu_current");
		$(".menu_user div").removeClass('sub_menu_current');
		$(".menu_user .Alliances").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Alliances'
		});
	});

	$(".bouton_content").click(function(){

		$(".menu_admin").fadeIn('fast');
		$(".menu_general").fadeOut('fast');
		$(".menu_user").fadeOut('fast');
		$(".pre_menu").fadeIn('slow');
		$(".menu_content").fadeIn('slow');

		$(".display_admin").fadeIn('fast');
		$(".display_admin .general").fadeOut('fast');
		$(".display_admin .user").fadeOut('fast');
		$(".display_admin .contenu").css('display', 'block');
		$(".display_admin .contenu div").css('display', 'none');
		$(".display_admin .contenu .ArmesSpec").slideDown('slow');

		$(".bouton_user").removeClass('pre_menu_current');
		$(".bouton_content").addClass('pre_menu_current');
		$(".bouton_general").removeClass("pre_menu_current");
		$(".menu_content div").removeClass('sub_menu_current');
		$(".menu_content .ArmesSpec").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Armes_spec'
		});
	});

	//General menu action
	$(".menu_general .Userlist").click(function(){
		$(".display_admin .general div").css('display', 'none');
		$(".menu_general div").removeClass('sub_menu_current');
		$(".display_admin .general .Userlist").slideDown('slow');
		$(".menu_general .Userlist").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Users'
		});
	});
	$(".menu_general .UserSpec").click(function(){
		$(".display_admin .general div").css('display', 'none');
		$(".menu_general div").removeClass('sub_menu_current');
		$(".display_admin .general .UserSpec").slideDown('slow');
		$(".menu_general .UserSpec").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Users_level_spec'
		});
	});
	$(".menu_general .Tiles").click(function(){
		$(".display_admin .general div").css('display', 'none');
		$(".menu_general div").removeClass('sub_menu_current');
		$(".display_admin .general .Tiles").slideDown('slow');
		$(".menu_general .Tiles").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Tiles'
		});
	});
	$(".menu_general .Pluie").click(function(){
		$(".display_admin .general div").css('display', 'none');
		$(".menu_general div").removeClass('sub_menu_current');
		$(".display_admin .general .Pluie").slideDown('slow');
		$(".menu_general .Pluie").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Pluie'
		});
	});
	$(".menu_general .Tornade").click(function(){
		$(".display_admin .general div").css('display', 'none');
		$(".menu_general div").removeClass('sub_menu_current');
		$(".display_admin .general .Tornade").slideDown('slow');
		$(".menu_general .Tornade").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Tornade'
		});
	});
	$(".menu_general .Sauterelle").click(function(){
		$(".display_admin .general div").css('display', 'none');
		$(".menu_general div").removeClass('sub_menu_current');
		$(".display_admin .general .Sauterelle").slideDown('slow');
		$(".menu_general .Sauterelle").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Sauterelles'
		});
	});
	$(".menu_general .Meteor").click(function(){
		$(".display_admin .general div").css('display', 'none');
		$(".menu_general div").removeClass('sub_menu_current');
		$(".display_admin .general .Meteor").slideDown('slow');
		$(".menu_general .Meteor").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Meteor'
		});
	});

	//User Content Actions
	$(".menu_user .Alliances").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .Alliances").slideDown('slow');
		$(".menu_user .Alliances").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Alliances'
		});
	});
	$(".menu_user .ArmesUser").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .ArmesUser").slideDown('slow');
		$(".menu_user .ArmesUser").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Armes'
		});
	});
	$(".menu_user .ArrosoirsUser").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .ArrosoirsUser").slideDown('slow');
		$(".menu_user .ArrosoirsUser").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Arrosoirs'
		});
	});
	$(".menu_user .EnergiesUser").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .EnergiesUser").slideDown('slow');
		$(".menu_user .EnergiesUser").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Energies'
		});
	});
	$(".menu_user .FruitsUser").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .FruitsUser").slideDown('slow');
		$(".menu_user .FruitsUser").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Fruits'
		});
	});
	$(".menu_user .GrainesUser").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .GrainesUser").slideDown('slow');
		$(".menu_user .GrainesUser").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Graines'
		});
	});
	$(".menu_user .MaisonsUser").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .MaisonsUser").slideDown('slow');
		$(".menu_user .MaisonsUser").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Maisons'
		});
	});
	$(".menu_user .PlantesUser").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .PlantesUser").slideDown('slow');
		$(".menu_user .PlantesUser").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Plantes'
		});
	});
	$(".menu_user .StockagesUser").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .StockagesUser").slideDown('slow');
		$(".menu_user .StockagesUser").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Stockages'
		});
	});

	//Content Actions
	$(".menu_content .ArmesSpec").click(function(){
		$(".display_admin .contenu div").css('display', 'none');
		$(".menu_content div").removeClass('sub_menu_current');
		$(".display_admin .contenu .ArmesSpec").slideDown('slow');
		$(".menu_content .ArmesSpec").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Armes_spec'
		});
	});
	$(".menu_content .ArrosoirsSpec").click(function(){
		$(".display_admin .contenu div").css('display', 'none');
		$(".menu_content div").removeClass('sub_menu_current');
		$(".display_admin .contenu .ArrosoirsSpec").slideDown('slow');
		$(".menu_content .ArrosoirsSpec").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Arrosoirs_spec'
		});
	});
	$(".menu_content .EnergiesSpec").click(function(){
		$(".display_admin .contenu div").css('display', 'none');
		$(".menu_content div").removeClass('sub_menu_current');
		$(".display_admin .contenu .EnergiesSpec").slideDown('slow');
		$(".menu_content .EnergiesSpec").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Energies_spec'
		});
	});
	$(".menu_content .FruitSpec").click(function(){
		$(".display_admin .contenu div").css('display', 'none');
		$(".menu_content div").removeClass('sub_menu_current');
		$(".display_admin .contenu .FruitSpec").slideDown('slow');
		$(".menu_content .FruitSpec").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Fruits_spec'
		});
	});
	$(".menu_content .GrainesSpec").click(function(){
		$(".display_admin .contenu div").css('display', 'none');
		$(".menu_content div").removeClass('sub_menu_current');
		$(".display_admin .contenu .GrainesSpec").slideDown('slow');
		$(".menu_content .GrainesSpec").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Graines_spec'
		});
	});
	$(".menu_content .StockagesSpec").click(function(){
		$(".display_admin .contenu div").css('display', 'none');
		$(".menu_content div").removeClass('sub_menu_current');
		$(".display_admin .contenu .StockagesSpec").slideDown('slow');
		$(".menu_content .StockagesSpec").addClass('sub_menu_current');

		socket.emit('selectDB', {
			table : 'Stockages_spec'
		});
	});

	$("body").on({
		click:function(){
		    var data = $(this).parent().parent().attr('id');
		    var Id = data.split('-')[1];
		    var Table = data.split('-')[0];
		   	socket.emit('DeleteDB', {
				table : Table,
				id : Id
			});
	    }
	}, ".delete");



	//réception des bonnes tables
	socket.on('returnDB', function(data){
		var str = '';
		if(data[0] == "Users"){
			str = '<tr><th>Id</th><th>Pseudo</th><th>email</th><th>Password</th><th>Status</th><th>Ip</th><th>Nb Fertilisants</th><th>Energies</th><th>Energies Max</th><th>Niveau</th><th>Alliance Id</th><th>Argent</th><th>Experience</th><th>Action</th></tr>';
			$('#Users').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['pseudo']+'</td>';
					str = str+'<td>'+data[1][i]['mail']+'</td>';
					str = str+'<td>'+data[1][i]['password']+'</td>';
					str = str+'<td>'+data[1][i]['status']+'</td>';
					str = str+'<td>'+data[1][i]['ip']+'</td>';
					str = str+'<td>'+data[1][i]['nb_fertilisants']+'</td>';
					str = str+'<td>'+data[1][i]['energies']+'</td>';
					str = str+'<td>'+data[1][i]['energies_max']+'</td>';
					str = str+'<td>'+data[1][i]['niveau']+'</td>';
					str = str+'<td>'+data[1][i]['alliance_id']+'</td>';
					str = str+'<td>'+data[1][i]['argent']+'</td>';
					str = str+'<td>'+data[1][i]['experience']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Users').append(str);
		}
		else if(data[0] == "Users_level_spec"){
			str = '<tr><th>Id</th><th>Tile next level</th><th>Conquete timer</th><th>Wait conquete timer</th><th>Resistance</th><th>Victory Timer</th><th>Win regen</th><th>Lose Regen</th><th>Action</th></tr>';
			$('#Users_level_spec').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['tile_next_level']+'</td>';
					str = str+'<td>'+data[1][i]['conquete_timer']+'</td>';
					str = str+'<td>'+data[1][i]['wait_conquetes_timer']+'</td>';
					str = str+'<td>'+data[1][i]['resistance']+'</td>';
					str = str+'<td>'+data[1][i]['victory_timer']+'</td>';
					str = str+'<td>'+data[1][i]['win_regen']+'</td>';
					str = str+'<td>'+data[1][i]['lose_regen']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Users_level_spec').append(str);
		}
		else if(data[0] == "Tiles"){
			str = '<tr><th>Id</th><th>Coord X</th><th>Coord Y</th><th>Sprite ID</th><th>Empty</th><th>Humidite</th><th>Fertilite</th><th>Visible</th><th>User ID</th><th>Action</th></tr>';
			$('#Tiles').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['x']+'</td>';
					str = str+'<td>'+data[1][i]['y']+'</td>';
					str = str+'<td>'+data[1][i]['sprite_id']+'</td>';
					str = str+'<td>'+data[1][i]['isEmpty']+'</td>';
					str = str+'<td>'+data[1][i]['humidite']+'</td>';
					str = str+'<td>'+data[1][i]['fertilite']+'</td>';
					str = str+'<td>'+data[1][i]['isVisible']+'</td>';
					str = str+'<td>'+data[1][i]['user_id']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Tiles').append(str);
		}
		else if(data[0] == "Pluie"){
			str = '<tr><th>Id</th><th>Active</th><th>Origin Tile ID</th><th>Longueur</th><th>Largeur</th><th>duree</th><th>Coord X</th><th>Coord Y</th><th>Action</th></tr>';
			$('#Pluie').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['isActive']+'</td>';
					str = str+'<td>'+data[1][i]['origin_tile_id']+'</td>';
					str = str+'<td>'+data[1][i]['longueur']+'</td>';
					str = str+'<td>'+data[1][i]['largeur']+'</td>';
					str = str+'<td>'+data[1][i]['duree']+'</td>';
					str = str+'<td>'+data[1][i]['x']+'</td>';
					str = str+'<td>'+data[1][i]['y']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Pluie').append(str);
		}
		else if(data[0] == "Tornade"){
			str = '<tr><th>Id</th><th>Active</th><th>Origin Tile ID</th><th>Vector X</th><th>Vector Y</th><th>Longueur</th><th>Largeur</th><th>duree</th><th>Coord X</th><th>Coord Y</th><th>Action</th></tr>';
			$('#Tornade').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['isActive']+'</td>';
					str = str+'<td>'+data[1][i]['origin_tile_id']+'</td>';
					str = str+'<td>'+data[1][i]['vectorX']+'</td>';
					str = str+'<td>'+data[1][i]['vectorY']+'</td>';
					str = str+'<td>'+data[1][i]['longueur']+'</td>';
					str = str+'<td>'+data[1][i]['largeur']+'</td>';
					str = str+'<td>'+data[1][i]['duree']+'</td>';
					str = str+'<td>'+data[1][i]['x']+'</td>';
					str = str+'<td>'+data[1][i]['y']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Tornade').append(str);
		}
		else if(data[0] == "Sauterelles"){
			str = '<tr><th>Id</th><th>Active</th><th>Origin Tile ID</th><th>Vector X</th><th>Vector Y</th><th>Longueur</th><th>Largeur</th><th>duree</th><th>Coord X</th><th>Coord Y</th><th>Action</th></tr>';
			$('#Sauterelles').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['isActive']+'</td>';
					str = str+'<td>'+data[1][i]['origin_tile_id']+'</td>';
					str = str+'<td>'+data[1][i]['vectorX']+'</td>';
					str = str+'<td>'+data[1][i]['vectorY']+'</td>';
					str = str+'<td>'+data[1][i]['longueur']+'</td>';
					str = str+'<td>'+data[1][i]['largeur']+'</td>';
					str = str+'<td>'+data[1][i]['duree']+'</td>';
					str = str+'<td>'+data[1][i]['x']+'</td>';
					str = str+'<td>'+data[1][i]['y']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Sauterelles').append(str);
		}
		else if(data[0] == "Meteor"){
			str = '<tr><th>Id</th><th>Active</th><th>Origin Tile ID</th><th>Longueur</th><th>Largeur</th><th>duree</th><th>Coord X</th><th>Coord Y</th><th>Action</th></tr>';
			$('#Meteor').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['isActive']+'</td>';
					str = str+'<td>'+data[1][i]['origin_tile_id']+'</td>';
					str = str+'<td>'+data[1][i]['longueur']+'</td>';
					str = str+'<td>'+data[1][i]['largeur']+'</td>';
					str = str+'<td>'+data[1][i]['duree']+'</td>';
					str = str+'<td>'+data[1][i]['x']+'</td>';
					str = str+'<td>'+data[1][i]['y']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Meteor').append(str);
		}
		else if(data[0] == "Alliances"){
			str = '<tr><th>Id</th><th>Name</th><th>Master User ID</th><th>Action</th></tr>';
			$('#Alliances').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['name']+'</td>';
					str = str+'<td>'+data[1][i]['master_user_id']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Alliances').append(str);
		}
		else if(data[0] == "Armes"){
			str = '<tr><th>Id</th><th>User ID</th><th>Armes Spec ID</th><th>Action</th></tr>';
			$('#Armes').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['user_id']+'</td>';
					str = str+'<td>'+data[1][i]['armes_spec_id']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Armes').append(str);
		}
		else if(data[0] == "Arrosoirs"){
			str = '<tr><th>Id</th><th>User ID</th><th>Arrosoirs Spec ID</th><th>Action</th></tr>';
			$('#Arrosoirs').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['user_id']+'</td>';
					str = str+'<td>'+data[1][i]['arrosoirs_spec_id']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Arrosoirs').append(str);
		}
		else if(data[0] == "Energies"){
			str = '<tr><th>Id</th><th>Is Construct</th><th>User ID</th><th>Energies Spec ID</th><th>Tile ID</th><th>Action</th></tr>';
			$('#Energies').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['isConstruct']+'</td>';
					str = str+'<td>'+data[1][i]['user_id']+'</td>';
					str = str+'<td>'+data[1][i]['energies_spec_id']+'</td>';
					str = str+'<td>'+data[1][i]['tile_id']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Energies').append(str);
		}
		else if(data[0] == "Fruits"){
			str = '<tr><th>Id</th><th>Number</th><th>User ID</th><th>Fruits Spec ID</th><th>Action</th></tr>';
			$('#Fruits').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['nb']+'</td>';
					str = str+'<td>'+data[1][i]['user_id']+'</td>';
					str = str+'<td>'+data[1][i]['fruits_spec_id']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Fruits').append(str);
		}
		else if(data[0] == "Graines"){
			str = '<tr><th>Id</th><th>Number</th><th>User ID</th><th>Graines Spec ID</th><th>Action</th></tr>';
			$('#Graines').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['nb']+'</td>';
					str = str+'<td>'+data[1][i]['user_id']+'</td>';
					str = str+'<td>'+data[1][i]['graines_spec_id']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Graines').append(str);
		}
		else if(data[0] == "Maisons"){
			str = '<tr><th>Id</th><th>Tile ID</th><th>User ID</th><th>Action</th></tr>';
			$('#Maisons').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['tile_id']+'</td>';
					str = str+'<td>'+data[1][i]['user_id']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Maisons').append(str);
		}
		else if(data[0] == "Plantes"){
			str = '<tr><th>Id</th><th>Croissance</th><th>Health</th><th>User ID</th><th>Graines Spec ID</th><th>Tile ID</th><th>Action</th></tr>';
			$('#Plantes').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['croissance']+'</td>';
					str = str+'<td>'+data[1][i]['health']+'</td>';
					str = str+'<td>'+data[1][i]['user_id']+'</td>';
					str = str+'<td>'+data[1][i]['graines_spec_id']+'</td>';
					str = str+'<td>'+data[1][i]['tile_id']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Plantes').append(str);
		}
		else if(data[0] == "Stockages"){
			str = '<tr><th>Id</th><th>Stockage State</th><th>Is Construct</th><th>User ID</th><th>Stockages Spec ID</th><th>Tile ID</th><th>Action</th></tr>';
			$('#Stockages').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['stockage_state']+'</td>';
					str = str+'<td>'+data[1][i]['isConstruct']+'</td>';
					str = str+'<td>'+data[1][i]['user_id']+'</td>';
					str = str+'<td>'+data[1][i]['stockages_spec_id']+'</td>';
					str = str+'<td>'+data[1][i]['tile_id']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Stockages').append(str);
		}
		else if(data[0] == "Armes_spec"){
			str = '<tr><th>Id</th><th>Name</th><th>Puissance</th><th>Precision</th><th>Vitesse</th><th>Prix</th><th>Action</th></tr>';
			$('#Armes_spec').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['name']+'</td>';
					str = str+'<td>'+data[1][i]['puissance']+'</td>';
					str = str+'<td>'+data[1][i]['precision']+'</td>';
					str = str+'<td>'+data[1][i]['vitesse']+'</td>';
					str = str+'<td>'+data[1][i]['prix']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Armes_spec').append(str);
		}
		else if(data[0] == "Arrosoirs_spec"){
			str = '<tr><th>Id</th><th>Name</th><th>Prix</th><th>Stockage</th><th>Action</th></tr>';
			$('#Arrosoirs_spec').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['name']+'</td>';
					str = str+'<td>'+data[1][i]['prix']+'</td>';
					str = str+'<td>'+data[1][i]['stockage']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Arrosoirs_spec').append(str);
		}
		else if(data[0] == "Energies_spec"){
			str = '<tr><th>Id</th><th>Name</th><th>Prix</th><th>Construction Time</th><th>Production</th><th>Niveau</th><th>Action</th></tr>';
			$('#Energies_spec').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['name']+'</td>';
					str = str+'<td>'+data[1][i]['prix']+'</td>';
					str = str+'<td>'+data[1][i]['constructionTime']+'</td>';
					str = str+'<td>'+data[1][i]['production']+'</td>';
					str = str+'<td>'+data[1][i]['niveau_requis']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Energies_spec').append(str);
		}
		else if(data[0] == "Fruits_spec"){
			str = '<tr><th>Id</th><th>Name</th><th>Prix Vente</th><th>Stockage</th><th>Poids</th><th>Action</th></tr>';
			$('#Fruits_spec').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['name']+'</td>';
					str = str+'<td>'+data[1][i]['prix_vente']+'</td>';
					str = str+'<td>'+data[1][i]['stockage']+'</td>';
					str = str+'<td>'+data[1][i]['poids']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Fruits_spec').append(str);
		}
		else if(data[0] == "Graines_spec"){
			str = '<tr><th>Id</th><th>Name</th><th>Maturation</th><th>Pourrissement</th><th>Production</th><th>Stockage</th><th>Croissance</th><th>Poids</th><th>Pirx</th><th>Sante Minimum</th><th>Niveau Requis</th><th>Action</th></tr>';
			$('#Graines_spec').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['name']+'</td>';
					str = str+'<td>'+data[1][i]['maturation']+'</td>';
					str = str+'<td>'+data[1][i]['pourrissement']+'</td>';
					str = str+'<td>'+data[1][i]['production']+'</td>';
					str = str+'<td>'+data[1][i]['stockage']+'</td>';
					str = str+'<td>'+data[1][i]['croissance']+'</td>';
					str = str+'<td>'+data[1][i]['poids']+'</td>';
					str = str+'<td>'+data[1][i]['prix']+'</td>';
					str = str+'<td>'+data[1][i]['sante_min']+'</td>';
					str = str+'<td>'+data[1][i]['niveau_requis']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Graines_spec').append(str);
		}
		else if(data[0] == "Stockages_spec"){
			str = '<tr><th>Id</th><th>Name</th><th>Taille</th><th>Prix</th><th>Stockage</th><th>Consommation</th><th>Construction Time</th><th>Niveau requis</th><th>Action</th></tr>';
			$('#Stockages_spec').text('');
			if(data[1] != 'empty'){
				for(var i = 0; i < data[1].length; i++){
					var id = data[1][i]['id'];
					str = str+'<tr id="'+data[0]+'-'+id+'">';
					str = str+'<td>'+data[1][i]['id']+'</td>';
					str = str+'<td>'+data[1][i]['name']+'</td>';
					str = str+'<td>'+data[1][i]['taille']+'</td>';
					str = str+'<td>'+data[1][i]['prix']+'</td>';
					str = str+'<td>'+data[1][i]['stockage']+'</td>';
					str = str+'<td>'+data[1][i]['consommation']+'</td>';
					str = str+'<td>'+data[1][i]['constructionTime']+'</td>';
					str = str+'<td>'+data[1][i]['niveau_requis']+'</td>';
					str = str+'<td><button class="delete">DELETE</button></td>';
					str = str+'</tr>';
				}
			}
			$('#Stockages_spec').append(str);
		}
	});

	

})(jQuery);