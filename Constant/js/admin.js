(function($){

	$("#button_admin").click(function(){
		$("#div_play").slideUp('fast');
		$("#div_menu").slideUp('fast');
		$("#div_begin").slideUp('fast');
		$("#overlay").slideUp('fast');

		$("#div_admin").fadeIn('fast');
		$(".menu_admin").fadeIn('fast');
		$(".menu_user").slideUp('fast');
		$(".menu_content").slideUp('fast');
		$(".pre_menu").fadeIn('slow');
		$(".menu_general").fadeIn('slow');

		$(".display_admin").fadeIn('fast');
		$(".display_admin.user").slideUp('fast');
		$(".display_admin.contenu").slideUp('fast');
		$(".display_admin.general").fadeIn('slow');
		$(".display_admin.general.Userlist").fadeIn('slow');
	});

	$("#admin_back").click(function(){
		$("#div_admin").slideUp('fast');

		$("#div_play").fadeIn('slow');
		$("#div_menu").fadeIn('slow');
		$("#div_begin").fadeIn('slow');
		$("#overlay").fadeIn('slow');
	});


})(jQuery);