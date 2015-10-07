$(document).ready(function() {

$('.next').hide();

	$("#myForm").submit(function(e) {
		e.preventDefault();
		var country = $("select").find('option:selected').attr("value");
		var year = $("input[name='year']").val();
		var request = "http://holidayapi.com/v1/holidays?year=" + year + "&country=" + country;
		var holiday_list = $(".holiday_list");
		var informHoliday = $(".inform");
		informHoliday.find('.country').text('Страна: ' +  $("select").find('option:selected').text());

 	$.ajax(request, {
		success: function(data) {
			var counter = 0;
			for (var key in data.holidays) {
				var value = data.holidays[key];
				
				$.each(value, function(i, val) {    // обрабатываем полученные данные

					holiday_list.append('<div class="wrap_item"><div class="date"></div><div class="name"></div></div></div>');

					holiday_list.find('.date:last').text(val.date);
					holiday_list.find('.name:last').text(val.name); 
					
					counter++;
					informHoliday.find('.name').text("Праздник (" + counter + ")");
				});
				
			}
		}, error: function() {
			alert("Something was wrong");
		}
	});
		
	// $("select option:first").attr('selected','selected');
	// $("input[name='year']").val('');
	  $('.holiday_list div.wrap_item').remove();
		$('.next').fadeIn('1000');
	});

$('.next').click(function(e) {
	e.preventDefault();
	var year = + $("input[name='year']").val() + 1;
	$("input[name='year']").val(year);
	var country1 = $("select").find('option:selected').attr("value");
	var year_next = year;
	var request1 = "http://holidayapi.com/v1/holidays?year=" + year_next + "&country=" + country1;
	var holiday_list1 = $(".holiday_list");

$.ajax(request1, {
		success: function(data) {

			for (var key in data.holidays) {
				var value = data.holidays[key];
				
				$.each(value, function(i, val) {    // обрабатываем полученные данные

					holiday_list1.append('<div class="wrap_item"><div class="date"></div><div class="name"></div></div></div>');

					holiday_list1.find('.date:last').text(val.date);
					holiday_list1.find('.name:last').text(val.name); 
				
				});
				
			}
		}, error: function() {
			alert("Something was wrong");
		}
});

// $('holiday_list1').jscroll();

});

	//Таймер обратного отсчета
	//Документация: http://keith-wood.name/countdown.html
	//<div class="countdown" date-time="2015-01-07"></div>
	var austDay = new Date($(".countdown").attr("date-time"));
	$(".countdown").countdown({until: austDay, format: 'yowdHMS'});

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox();

	//Навигация по Landing Page
	//$(".top_mnu") - это верхняя панель со ссылками.
	//Ссылки вида <a href="#contacts">Контакты</a>
	$(".top_mnu").navigation();

	//Добавляет классы дочерним блокам .block для анимации
	//Документация: http://imakewebthings.com/jquery-waypoints/
	$(".block").waypoint(function(direction) {
		if (direction === "down") {
			$(".class").addClass("active");
		} else if (direction === "up") {
			$(".class").removeClass("deactive");
		};
	}, {offset: 100});

	//Плавный скролл до блока .div по клику на .scroll
	//Документация: https://github.com/flesler/jquery.scrollTo
	$("a.scroll").click(function() {
		$.scrollTo($(".div"), 800, {
			offset: -90
		});
	});

	//Каруселька
	//Документация: http://owlgraphic.com/owlcarousel/
	var owl = $(".carousel");
	owl.owlCarousel({
		items : 4
	});
	owl.on("mousewheel", ".owl-wrapper", function (e) {
		if (e.deltaY > 0) {
			owl.trigger("owl.prev");
		} else {
			owl.trigger("owl.next");
		}
		e.preventDefault();
	});
	$(".next_button").click(function(){
		owl.trigger("owl.next");
	});
	$(".prev_button").click(function(){
		owl.trigger("owl.prev");
	});

	//Кнопка "Наверх"
	//Документация:
	//http://api.jquery.com/scrolltop/
	//http://api.jquery.com/animate/
	$("#top").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	
	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("#form").submit(function() {
		$.ajax({
			type: "GET",
			url: "mail.php",
			data: $("form").serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});

});