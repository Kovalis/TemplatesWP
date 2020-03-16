jQuery(document).ready(function($){
	//modal reopen
	var modal_show = false;
	$('.modal').on('show.bs.modal', function (e) {
		var modal = $(this);

		if ($('.modal.show').not(modal).length > 0) {
			e.preventDefault();

			modal_show = modal.modal('dispose');

			$('.modal.show').not(modal).modal('hide');
		} else {
			modal_show = false;
		}

		modal.find('form input[type!=checkbox][type!=radio][type!=hidden], form textarea, form select').val('').blur();
		modal.find('form .alert-dismissible').remove();
	});

	$('.modal').on('hidden.bs.modal', function (e) {
		if (modal_show != false) {
			modal_show.modal('show');
		}
	});

	// green placeholder
	$("body").on('focus', '.callback-input input, .callback-input textarea, .callback-input select', function() {
		$(this).siblings('div').addClass("active");
		$(this).parents('.callback-input').addClass("active");
	});

	$("body").on('blur', '.callback-input input, .callback-input textarea, .callback-input select', function() {
		var input = $(this), div = input.siblings('div');
		if(div.length > 0 && (input.val() == '' || input.val() == '+7 (___) ___-____'))
			div.removeClass("active");
			$(this).parents('.callback-input').removeClass("active");
	});

	$('.modal').on('DOMSubtreeModified', function (e) {
		var input = $(this), div = input.siblings('div');
		if(!(div.length > 0 && (input.val() == '' || input.val() == '+7 (___) ___-____'))){
			div.addClass("active");
			$(this).parents('.callback-input').addClass("active");
		}
	});
	$(".callback-input input, .callback-input textarea").each(function() {
		var input = $(this), div = input.siblings('div');
		if(!(div.length > 0 && (input.val() == '' || input.val() == '+7 (___) ___-____'))){
			div.addClass("active");
			$(this).parents('.callback-input').addClass("active");
		}
	});
	
	// убираем значек незаполненного поля в форме
	$('body').on('mouseenter', '.wrap_input', function() {
		console.log("fds");
	    $(this).find(".wpcf7-not-valid-tip").css("display", "none");
	});

	// якоря
	$(".js_anchor").click(function() {
		var elementClick = $(this).attr("href");
		var destination = $(elementClick).offset().top;
		jQuery("html:not(:animated),body:not(:animated)").animate({
		  scrollTop: destination
		}, 800);
		return false;
	});

});

$(window).on("load", function (e) {
	// menu 
	var modalHeight;
	// адаптив меню на мобильнике
	$('.main-menu__but').on('click',function (e) {
		e.preventDefault();
		$(this).toggleClass("but_hid");
		$('.main-menu__menu2').toggleClass("active");
		modalHeight = $('.main-menu__menu2').outerHeight(true);
		
		if (window.innerWidth < 992) {
			$("body").toggleClass("body-hide");
			$("html").toggleClass("active");
			if($("body").hasClass('body-hide')){
				//console.log(modalHeight);
				var h_header = $('header').outerHeight(true);
				$("body").css('height', (modalHeight + h_header)+"px");
				$("main").css('overflow-x',"initial");
			} else{
				$("body").css('height', 'auto');
				$("main").css('overflow-x',"hidden");
			}
		}
	});


	if($(window).width() < 992){
		$('.main-menu__menu .menu-item-has-children > a').click(function(event) {
			event.preventDefault();
			$(this).toggleClass("active");
			$(this).siblings(".sub-menu").toggleClass("active");
			modalHeight = $('.main-menu__menu2').outerHeight(true);
			modalHeight += $('header').outerHeight(true);
			console.log(modalHeight);
			$("body").css('height', modalHeight+"px");
		});
	}


	$(window).resize(function() {
		if (window.innerWidth > 991) {
			$("body").removeClass("body-hide");
			$("html").removeClass("active");
			$("body").css('height', 'auto');
			$("main").css('overflow-x',"hidden");

			//закрываем адаптивное меню для ПК
			$('.main-menu__but.but_hid').click();
		}
	});

});