/**
 * Created by Anatoliy on 17.08.2016.
 */



var User = {
	signUp       : function () {
		User.renderSignUp();
	},
	logIn        : function () {
		User.renderLogIn();
	},
	signUpConfirm: function () {
		var form = {};
		form["email"] = $('#email').val();
		form["password"] = $('#password').val();
		form["nick"] = $('#nick').val();
		form["qiwi"] = $('#qiwi').val();
		$.ajax({
			type    : 'POST',
			dataType: "json",
			url     : 'api/user.signUp.php',
			data    : 'json=' + JSON.stringify(form),
			success : function (data) {


				//var json = JSON.parse(data);
				if (data.error != null) {
					if (data.error.code == 1) {
						$("#email_error").text(data.error.text);
					}
					else if (data.error.code == 2) {
						$("#password_error").text(data.error.text);
					}
					else if (data.error.code == 4) {
						$("#nick_error").text(data.error.text);
					}
					else if (data.error.code == 3) {
						$("#email_error").text(data.error.text);
					}
					else if (data.error.code == 5) {
						$("#qiwi_error").text(data.error.text);
					}
				}
				if (data.response.code == 1) {
					window.location.reload();

				}

			}
		});
	},

	logInConfirm: function () {
		var form = {};
		form["email"] = $('#email').val();
		form["password"] = $('#password').val();
		$.ajax({
			type    : 'POST',
			dataType: "json",
			url     : 'api/user.logIn.php',
			data    : 'json=' + JSON.stringify(form),
			success : function (data) {
				//alert(JSON.stringify(data));

				//var json = JSON.parse(data);
				if (data.error != null) {
					if (data.error.code == 1) {
						$("#email_error").text(data.error.text);
					}
					else if (data.error.code == 2) {
						$("#password_error").text(data.error.text);
					}
					else if (data.error.code == 4) {
						alert(data.error.text);
					}

				}
				if (data.response.code == 1) {
					window.location.reload();

				}

			}
		});
	},
	renderSignUp: function () {
		$.sweetModal({
			title  : 'Регистрация',
			content: [
				' <div class="row login_row">',
				'  <input type="text" class="text_width100" id="email" placeholder="Ваш email"">',
				'<span id="email_error" class="error"></span>',
				' </div>',
				' <div class="row login_row">',
				'  <input type="text" class="text_width100" id="password" placeholder="Ваш пароль"">',
				'<span id="password_error" class="error"></span>',
				' </div>',
				' <div class="row login_row">',
				'  <input type="text" class="text_width100" id="nick" placeholder="Ваш игровой ник"">',
				'<span id="nick_error" class="error"></span>',
				' </div>',
				' <div class="row login_row">',
				'  <input type="text" class="text_width100" id="qiwi" placeholder="Ваш qiwi кошелек"">',
				'<span id="qiwi_error" class="error"></span>',
				' </div>',
				' <div class="row login_row">',
				'  <a href="#" onclick="User.signUpConfirm()" class="button btn_login db">Открыть</a>',
				' </div>',

			]
					.join(''),
			theme  : $.sweetModal.THEME_LIGHT
		});


	},

	renderLogIn: function () {
		$.sweetModal({
			title  : 'Авторизация',
			content: [
				' <div class="login_row">',
				'  <input type="text" class="text_width100" id="email" value="demo_user@gmail.ru" placeholder="Ваш email">',
				'		<span id="email_error" class="error"></span>',
				' </div>',
				' <div class="login_row">',
				'  <input type="text" class="text_width100" id="password" value="qwerty" placeholder="Ваш пароль">',
				'<span id="password_error" class="error"></span>',
				' </div>',
				' <div class="login_row">',
				'  <a href="#" onclick="User.logInConfirm()" class="button btn_login db">Открыть</a>',
				' </div>',

			]
					.join(''),
			theme  : $.sweetModal.THEME_LIGHT
		});
	},

	qiwiRedirect: function () {
		var url = "https://w.qiwi.com/transfer/form.action?extra%5B%27account%27%5D=+380973160343&amountInteger=100&amountFraction=0&extra%5B%27comment%27%5D=Пополнение счета, trove"
		window.open(url, '_blank')

	},

	deposit      : function () {
		User.renderDeposit();
	},
	renderDeposit: function () {
		$.sweetModal({
			title  : 'Оплата',
			content: [
				' <div class="row login_row">',
				'  <span type="text" class="text_width100"> Зачисление оплаты происходит в автоматическом режиме, в течении 2 минут.' +
				'Для этого, нажмите кнопку оплатить и переведите нужную сумму' +
				'</span>',
				'<span id="email_error" class="error"></span>',
				' </div>',

				' <div class="row login_row">',
				'Отключено!',
				// '  <a href="#" onclick="User.qiwiRedirect();" class="button_buy db">Оплатить</a>',
				' </div>',

			]
					.join(''),
			theme  : $.sweetModal.THEME_LIGHT
		});
	},


};


function Timer() {
	var timer_id;

	this.start = function (callback, interval) {

		timer_id = setInterval(function () {
			callback();
		}, interval);

	};


	this.stop = function () {
		clearInterval(timer_id);
	};


};


var Chest = {
	index    : 10,
	timer    : new Timer(1000),
	modal    : null,
	startOpen: function (id) {


		Chest.index = Chest.getRandomNumber(5, 10);

		$('#carouselOpenCase').myCarousel().removeActive();


		Chest.index = Chest.getRandomNumber(5, 10);
		$.ajax({
			type    : 'POST',
			dataType: "json",
			url     : 'api/chest.buy.php',
			data    : {id: id},
			success : function (data) {

				if (data.error.code == 1) {
					Chest.modal = $.sweetModal({
						title  : 'Ошибка',
						content: [
							' <div class="row login_row">',
							'  <span type="text" class="text_width100">Не достаточно денег на балансе!</span>',
							'<span id="email_error" class="error"></span>',
						]
								.join(''),
						theme  : $.sweetModal.THEME_LIGHT
					});
				}
				else {
					Chest.index = 10;
					$('#carouselOpenCase').myCarousel().removeActive();


					Chest.timer.start(function () {

						$('#carouselOpenCase').myCarousel({
							visible    : 6,
							rotateBy   : 1,
							tick       : Chest.setIndex,
							countSlide : Chest.index,
							winnerItem : 'chest' + data.response.idItem,
							eventFinish: Chest.stopOpen,
						}).nextToRight();


					}, 100);
				}


			}
		});


	},

	stopOpen: function () {
		Chest.timer.stop();
		//Chest.finishOpenCase()
	},


	setIndex: function () {
		Chest.index--;
	},

	getRandomNumber: function (min, max) {
		return Math.random() * (max - min) + min;
	},

	finishOpenCase: function () {
		$.sweetModal({
			title  : 'Регистрация',
			content: [
				' <div class="row login_row">',
				'  <input type="text" class="text_width100" id="email" placeholder="Ваш email"">',
				'<span id="email_error" class="error"></span>',
				' </div>',
				' <div class="row login_row">',
				'  <input type="text" class="text_width100" id="password" placeholder="Ваш пароль"">',
				'<span id="password_error" class="error"></span>',
				' </div>',
				' <div class="row login_row">',
				'  <input type="text" class="text_width100" id="nick" placeholder="Ваш игровой ник"">',
				'<span id="nick_error" class="error"></span>',
				' </div>',
				' <div class="row login_row">',
				'  <input type="text" class="text_width100" id="qiwi" placeholder="Ваш qiwi кошелек"">',
				'<span id="qiwi_error" class="error"></span>',
				' </div>',
				' <div class="row login_row">',
				'  <a href="#" onclick="User.signUpConfirm()" class="button btn_login db">Открыть</a>',
				' </div>',

			]
					.join(''),
			theme  : $.sweetModal.THEME_LIGHT
		});
	},


	addChest    : function () {
		Chest.modal = $.sweetModal({
			title  : 'Добавить сундук',
			content: [
				' <div class="row login_row">',
				'  <input type="text" class="text_width100" id="logo" placeholder="Ссылка на логотип сундука">',
				'<span id="email_error" class="error"></span>',
				' </div>',
				' <div class="row login_row">',
				'  <input type="text" class="text_width100" id="price"  placeholder="Стоимость сундука">',
				'<span id="password_error" class="error"></span>',
				' </div>',


				' <div class="row login_row">',
				'  <a href="#" onclick="Chest.addChestSend()" class="button btn_login db">Открыть</a>',
				' </div>',

			]
					.join(''),
			theme  : $.sweetModal.THEME_LIGHT
		});

	},
	addChestSend: function () {
		var form = {};
		form["logo"] = $('#logo').val();
		form["price"] = $('#price').val();
		$.ajax({
			type    : 'POST',
			dataType: "json",
			url     : 'api/chest.addChest.php',
			data    : 'json=' + JSON.stringify(form),
			success : function (data) {

				alert(JSON.stringify(data));
			}
		});

	},
    itemGiven: function (idItem) {

        $.ajax({
            type    : 'POST',
            dataType: "json",
            url     : 'api/chest.itemGiven.php',
            data    : {idItem: idItem},
            complete : function (data) {
				$("#winItem" + idItem).remove();
               // alert(JSON.stringify(data));
            }
        });

    },

    demoOpen: function (id) {


        Chest.index = Chest.getRandomNumber(5, 10);

        $('#carouselOpenCase').myCarousel().removeActive();


        Chest.index = Chest.getRandomNumber(5, 10);
        $.ajax({
            type    : 'POST',
            dataType: "json",
            url     : 'api/chest.buyDemo.php',
            data    : {id: id},
            success : function (data) {

                if (data.error.code == 1) {
                    Chest.modal = $.sweetModal({
                        title  : 'Ошибка',
                        content: [
                            ' <div class="row login_row">',
                            '  <span type="text" class="text_width100">Не достаточно денег на балансе!</span>',
                            '<span id="email_error" class="error"></span>',
                        ]
                            .join(''),
                        theme  : $.sweetModal.THEME_LIGHT
                    });
                }
                else {
                    Chest.index = 10;
                    $('#carouselOpenCase').myCarousel().removeActive();


                    Chest.timer.start(function () {

                        $('#carouselOpenCase').myCarousel({
                            visible    : 6,
                            rotateBy   : 1,
                            tick       : Chest.setIndex,
                            countSlide : Chest.index,
                            winnerItem : 'chest' + data.response.idItem,
                            eventFinish: Chest.stopOpen,
                        }).nextToRight();


                    }, 100);
                }


            }
        });


    },


	deleteItemsById: function (idItem) {

		$.ajax({
			type    : 'POST',
			dataType: "json",
			url     : 'api/chest.deleteItemById.php',
			data    : {idItem: idItem},
			success : function (data) {
				window.location.reload();
			}
		});
	},
    deleteChestById: function (idChest) {

        $.ajax({
            type    : 'POST',
            dataType: "json",
            url     : 'api/chest.deleteChestById.php',
            data    : {idChest: idChest},
            complete : function (data) {
                window.location.reload();
            }
        });
    },

	addItemToChest    : function (idChest) {
		Chest.modal = $.sweetModal({
			title  : 'Добавить предмет в сундук',
			content: [
				' <div class="row login_row">',
				'  <input type="text" class="text_width100" id="logo" placeholder="Ссылка на логотип предмета">',
				'<span id="logo_error" class="error"></span>',
				' </div>',
				' <div class="row login_row">',
				'  <input type="text" class="text_width100" id="nameItem"  placeholder="Имя предмета">',
				'<span id="nameItem_error" class="error"></span>',
				' </div>',
				' <div class="row login_row">',
				'  <input type="text" class="text_width100" id="countItem"  placeholder="Количество предметов">',
				'<span id="countItem_error" class="error"></span>',
				' </div>',
				' <div class="row login_row">',
				'  <input type="text" class="text_width100" id="chanceDrop"  placeholder="Шанс выпадения">',
				'<span id="chanceDrop_error" class="error"></span>',
				' </div>',

				' <div class="row login_row">',
				'  <a href="#" onclick="Chest.addItemToChestSend(' + idChest + ')" class="button btn_login db">Добавить</a>',
				' </div>',

			]
					.join(''),
			theme  : $.sweetModal.THEME_LIGHT
		});

	},
	addItemToChestSend: function (idChest) {

		var form = {};
		form["logo"] = $('#logo').val();
		form["name"] = $('#nameItem').val();
		form["count"] = $('#countItem').val();
		form["chance"] = $('#chanceDrop').val();
		form["chestId"] = idChest;
		$.ajax({
			type    : 'POST',
			dataType: "json",
			url     : 'api/chest.addItemToChest.php',
			data    : 'json=' + JSON.stringify(form),
			success : function (data) {

				//		alert(JSON.stringify(data));
				if (data.error != null) {
					if (data.error.code == 1) {
						$("#logo_error").text(data.error.text);
					}
					else if (data.error.code == 4) {
						$("#countItem_error").text(data.error.text);
					}
					else if (data.error.code == 3) {
						$("#nameItem_error").text(data.error.text);
					}
					else if (data.error.code == 5) {
						$("#chanceDrop").text(data.error.text);
					}
				}
				if (data.response.code == 1) {
					Chest.modal.close();
				}


			}
		});

	},


};


$(document).ready(function () {
	$("li").click(function () {
		var url = $(this).attr("data-url");
		window.location = url == undefined ? '#' : url;


	});

});

(function ($) {
	$.fn.myCarousel = function (options) {
		var settings = {
			visible    : 5,
			rotateBy   : 1,
			speed      : 111,
			btnNext    : null,
			btnPrev    : null,
			auto       : null,
			backSlide  : false,
			tick       : null,
			countSlide : 10,
			winnerItem : 0,
			eventFinish: null,
		};

		return this.each(function () {
					if (options) {
						$.extend(settings, options);
					}

					var $this = $(this);
					var $carousel = $this.children(':first');
					var itemWidth = $carousel.children().outerWidth();
					var itemsTotal = $carousel.children().length;
					var running = false;
					var intID = null;
					var winner = false;
					var countSlide = 20;

					var $items = $carousel.children();


					$.fn.nextToRight = function () {
						return slide(false);
					};
					$.fn.removeActive = function () {

						$items.each(function (index) {

							//$(this).css('background-color', 'red');
							$(this).removeClass("active");

						});
					};

					$this.css({
						'position': 'relative',
						'overflow': 'hidden',
						'width'   : settings.visible * itemWidth + 'px'
					});

					$carousel.css({
						'position': 'relative',
						'width'   : 9999 + 'px',
						'left'    : 0
					});

					function slide(dir) {
						var direction = !dir ? -1 : 1;
						var leftIndent = 0;

						if (!running) {
							running = true;

							if (intID) {
								window.clearInterval(intID);
							}

							if (!dir) {
								var ids = []; // тут массив айди блоков

								$items.each(function (index) {
									//ids[index] = $(this).attr('id');
									if (settings.countSlide < 1 && index == 2 && $(this).attr('id') == settings.winnerItem) {
										//$(this).css('background-color', 'red');
										$(this).addClass("active");
										settings.eventFinish();
										winner = true;

									}
								});
								if (!winner) {
									$carousel.children(':last').after($carousel.children().slice(0, settings.rotateBy).clone(true));
								}
							}
							else {
								$carousel.children(':first').before($carousel.children().slice(itemsTotal - settings.rotateBy, itemsTotal).clone(true));
								$carousel.css('left', -itemWidth * settings.rotateBy + 'px');
							}
							if (!winner) {
								leftIndent = parseInt($carousel.css('left')) + (itemWidth * settings.rotateBy * direction);
							}

							$carousel.animate({'left': leftIndent}, {
								queue: false, duration: settings.speed, complete: function () {
									if (!winner) {
										if (!dir) {
											$carousel.children().slice(0, settings.rotateBy).remove();
											$carousel.css('left', 0);
											settings.tick();
											//countSlide = countSlide - 1;
											console.log(settings.countSlide + " " + winner + " " + settings.winnerItem);
										} else {
											$carousel.children().slice(itemsTotal, itemsTotal + settings.rotateBy).remove();
										}
									}


									if (settings.auto) {
										intID = window.setInterval(function () {
											slide(settings.backslide);
										}, settings.auto);
									}

									running = false;
								}
							});


						}


						return false;
					}


					$(settings.btnNext).click(function () {
						return slide(false);
					});

					$(settings.btnPrev).click(function () {
						return slide(true);
					});

					if (settings.auto) {
						intID = window.setInterval(function () {
							slide(settings.backslide);
						}, settings.auto);
					}
				}
		);
	};
})(jQuery);