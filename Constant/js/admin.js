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

		var users = socket.emit('selectDB', {
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
	});

	//General menu action
	$(".menu_general .Userlist").click(function(){
		$(".display_admin .general div").css('display', 'none');
		$(".menu_general div").removeClass('sub_menu_current');
		$(".display_admin .general .Userlist").slideDown('slow');
		$(".menu_general .Userlist").addClass('sub_menu_current');
	});
	$(".menu_general .UserSpec").click(function(){
		$(".display_admin .general div").css('display', 'none');
		$(".menu_general div").removeClass('sub_menu_current');
		$(".display_admin .general .UserSpec").slideDown('slow');
		$(".menu_general .UserSpec").addClass('sub_menu_current');
	});
	$(".menu_general .Tiles").click(function(){
		$(".display_admin .general div").css('display', 'none');
		$(".menu_general div").removeClass('sub_menu_current');
		$(".display_admin .general .Tiles").slideDown('slow');
		$(".menu_general .Tiles").addClass('sub_menu_current');
	});
	$(".menu_general .Pluie").click(function(){
		$(".display_admin .general div").css('display', 'none');
		$(".menu_general div").removeClass('sub_menu_current');
		$(".display_admin .general .Pluie").slideDown('slow');
		$(".menu_general .Pluie").addClass('sub_menu_current');
	});
	$(".menu_general .Tornade").click(function(){
		$(".display_admin .general div").css('display', 'none');
		$(".menu_general div").removeClass('sub_menu_current');
		$(".display_admin .general .Tornade").slideDown('slow');
		$(".menu_general .Tornade").addClass('sub_menu_current');
	});
	$(".menu_general .Sauterelle").click(function(){
		$(".display_admin .general div").css('display', 'none');
		$(".menu_general div").removeClass('sub_menu_current');
		$(".display_admin .general .Sauterelle").slideDown('slow');
		$(".menu_general .Sauterelle").addClass('sub_menu_current');
	});
	$(".menu_general .Meteor").click(function(){
		$(".display_admin .general div").css('display', 'none');
		$(".menu_general div").removeClass('sub_menu_current');
		$(".display_admin .general .Meteor").slideDown('slow');
		$(".menu_general .Meteor").addClass('sub_menu_current');
	});

	//User Content Actions
	$(".menu_user .Alliances").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .Alliances").slideDown('slow');
		$(".menu_user .Alliances").addClass('sub_menu_current');
	});
	$(".menu_user .ArmesUser").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .ArmesUser").slideDown('slow');
		$(".menu_user .ArmesUser").addClass('sub_menu_current');
	});
	$(".menu_user .ArrosoirsUser").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .ArrosoirsUser").slideDown('slow');
		$(".menu_user .ArrosoirsUser").addClass('sub_menu_current');
	});
	$(".menu_user .EnergiesUser").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .EnergiesUser").slideDown('slow');
		$(".menu_user .EnergiesUser").addClass('sub_menu_current');
	});
	$(".menu_user .FruitsUser").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .FruitsUser").slideDown('slow');
		$(".menu_user .FruitsUser").addClass('sub_menu_current');
	});
	$(".menu_user .GrainesUser").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .GrainesUser").slideDown('slow');
		$(".menu_user .GrainesUser").addClass('sub_menu_current');
	});
	$(".menu_user .MaisonsUser").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .MaisonsUser").slideDown('slow');
		$(".menu_user .MaisonsUser").addClass('sub_menu_current');
	});
	$(".menu_user .PlantesUser").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .PlantesUser").slideDown('slow');
		$(".menu_user .PlantesUser").addClass('sub_menu_current');
	});
	$(".menu_user .StockagesUser").click(function(){
		$(".display_admin .user div").css('display', 'none');
		$(".menu_user div").removeClass('sub_menu_current');
		$(".display_admin .user .StockagesUser").slideDown('slow');
		$(".menu_user .StockagesUser").addClass('sub_menu_current');
	});

	//Content Actions
	$(".menu_content .ArmesSpec").click(function(){
		$(".display_admin .contenu div").css('display', 'none');
		$(".menu_content div").removeClass('sub_menu_current');
		$(".display_admin .contenu .ArmesSpec").slideDown('slow');
		$(".menu_content .ArmesSpec").addClass('sub_menu_current');
	});
	$(".menu_content .ArrosoirsSpec").click(function(){
		$(".display_admin .contenu div").css('display', 'none');
		$(".menu_content div").removeClass('sub_menu_current');
		$(".display_admin .contenu .ArrosoirsSpec").slideDown('slow');
		$(".menu_content .ArrosoirsSpec").addClass('sub_menu_current');
	});
	$(".menu_content .EnergiesSpec").click(function(){
		$(".display_admin .contenu div").css('display', 'none');
		$(".menu_content div").removeClass('sub_menu_current');
		$(".display_admin .contenu .EnergiesSpec").slideDown('slow');
		$(".menu_content .EnergiesSpec").addClass('sub_menu_current');
	});
	$(".menu_content .FruitSpec").click(function(){
		$(".display_admin .contenu div").css('display', 'none');
		$(".menu_content div").removeClass('sub_menu_current');
		$(".display_admin .contenu .FruitSpec").slideDown('slow');
		$(".menu_content .FruitSpec").addClass('sub_menu_current');
	});
	$(".menu_content .GrainesSpec").click(function(){
		$(".display_admin .contenu div").css('display', 'none');
		$(".menu_content div").removeClass('sub_menu_current');
		$(".display_admin .contenu .GrainesSpec").slideDown('slow');
		$(".menu_content .GrainesSpec").addClass('sub_menu_current');
	});
	$(".menu_content .StockagesSpec").click(function(){
		$(".display_admin .contenu div").css('display', 'none');
		$(".menu_content div").removeClass('sub_menu_current');
		$(".display_admin .contenu .StockagesSpec").slideDown('slow');
		$(".menu_content .StockagesSpec").addClass('sub_menu_current');
	});


	//réception des bonnes tables
	socket.on('returnDB', function(data){
		var str = '';
		if(data[0] == "Users"){
			str = '<tr><th>Id</th><th>Pseudo</th><th>email</th><th>Password</th><th>Status</th><th>Ip</th><th>Nb Fertilisants</th><th>Energies</th><th>Energies Max</th><th>Niveau</th><th>Alliance Id</th><th>Argent</th><th>Experience</th></tr>';
			$('#Users').text('');
			for(var i = 0; i < data[1].length; i++){
				str = str+'<tr>';
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
				str = str+'</tr>';
				console.log(str);
			}
			$('#Users').append(str);
		}
		
	});


})(jQuery);