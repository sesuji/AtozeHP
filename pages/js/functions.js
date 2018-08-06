

;(function($,window,undefind) {

	var $window = $(window);
	var is_anim = true;

	var Common;

	window.Common = Common;

	Common = Common || {

			DEBUG: true,
			URL_QUERY: {},
			is_fade: true,
			Page: null,
			Window: {
				$window: null,
				$document: null,
				width: 0,
				height: 0
			},
			LAYOUT_MODE: "pc",
			user_agent: null,
			loaded_img_len: 0,
			img_len: 0,
			img_src_ary: [],
			is_intro_skip: false,
			$body: null,
			timeout_timer: null,
			$header: null,
			is_show_pickup: false,

			/* -----------------------------------------------
			 * 蛻晏屓縺ｫ荳蠎ｦ縺�縺大ｮ溯｡後☆繧�
			 * ----------------------------------------------- */
			setupOnce: function(){
				Common.trace("Common -> setupOnce");

				Common.$body = $("body");
				Common.$header = $("#header");
				Common.$blind = $("#blind");
				Common.$loader = $("#preloader");
				Common.$side = $("#side");
				Common.$footer = $("#footer");
				Common.$pickup = $("#pickup");

				// 繧ｦ繧｣繝ｳ繝峨え髢｢騾｣縺ｮ諠��ｱ繧偵そ繝�ヨ
				Common.Window.$window = $(window);
				Common.Window.$document = $(document);
				Common.Window.width = Common.Window.$window.width();
				Common.Window.height = Common.Window.$window.height();

				// URL繧ｯ繧ｨ繝ｪ繧貞叙蠕�
				Common.URL_QUERY = Common.getURLQuery();

				// 繝ｦ繝ｼ繧ｶ繝ｼ繧ｨ繝ｼ繧ｸ繧ｧ繝ｳ繝域ュ蝣ｱ繧貞叙蠕励｜ody縺ｫ繧ゅけ繝ｩ繧ｹ蜷阪→縺励※莉倅ｸ弱☆繧�
				Common.user_agent = Common.setUserAgent();

				if(Common.Window.width <= 767){
					Common.LAYOUT_MODE = "sp";
				}
				else{
					if(Common.user_agent.Mobile){
						Common.LAYOUT_MODE = "sp";
					}else{
						Common.LAYOUT_MODE = "pc";
					};
				};

				// 譛蛻昴↓繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ菴咲ｽｮ繧剃ｸ逡ｪ荳翫↓謌ｻ縺�
				$(window, document, "html,body").scrollTop(0);
				$('html,body').animate({ scrollTop: 0 }, '1');

				// SP縺ｮ蝣ｴ蜷医↓SP逕ｨ逕ｻ蜒上↓蟾ｮ縺玲崛縺�
				if(Common.LAYOUT_MODE == "sp"){
					for(var i = 0; i < $('.switch').length; i++){
						$('.switch').eq(i).attr('src', $('.switch').eq(i).attr('src').replace('_pc', '_sp'));
					}
				}

				// 繝壹�繧ｸ陦ｨ遉ｺ蜑阪�繝倥ャ繝繝ｼ繧､繝吶Φ繝医＆縺帙↑縺�
				Common.$header.addClass('is__moving');

				// return;
				Common.ResizeEvent.init();
				Common.setHoverEvent(); // 繧ｹ繝槭�縺ｮ繝帙ヰ繝ｼ蛻ｶ蠕｡

				Common.showPreLoader();
				// Common.initPreLoader();

				/* -----------------------------------------------
				 * 繧ｯ繝�く繝ｼ蜃ｦ逅�
				 * ----------------------------------------------- */
				// if( Common.getParam("c") == "c" ){
				// 	$.cookie("first", null); // cookie縺ｮ蠑ｷ蛻ｶ繧ｯ繝ｪ繧｢
				// };
				// if(!$.cookie('first')){
				// 	$.cookie('first','0',{ path: "/" }); // cookie繧堤匱陦後☆繧九ョ繧｣繝ｬ繧ｯ繝医Μ繧呈欠螳�
				// };


				// 蛻晏屓繧｢繧ｯ繧ｻ繧ｹ譎ゅ�蜃ｦ逅�ｼ�cookie縺檎匱陦後＆繧後※縺�↑縺�ｼ�
				// if($.cookie('first') == "0") {
				// 	//
				// } else{
				// 	//
				// }

			},

			getURLQuery: function () {
				var url = location.href;
				var parameters = url.split("?");
				if (parameters.length < 2) return false;
				params = parameters[1].split("&");
				var paramsArray = [];
				for (i = 0; i < params.length; i++) {
					neet = params[i].split("=");
					paramsArray.push(neet[0]);
					paramsArray[neet[0]] = neet[1];
				}
				// var categoryKey = paramsArray[opt_key];
				return paramsArray;
			},

			setHoverEvent: function(){
				var _ua = (function(u){
					return {
						Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
						|| u.indexOf("ipad") != -1
						|| (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
						|| (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
						|| u.indexOf("kindle") != -1
						|| u.indexOf("silk") != -1
						|| u.indexOf("playbook") != -1,
						Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
						|| u.indexOf("iphone") != -1
						|| u.indexOf("ipod") != -1
						|| (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
						|| (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
						|| u.indexOf("blackberry") != -1,
						iOS:(u.indexOf("iphone") != -1)
						|| u.indexOf("ipod") != -1
						|| u.indexOf("ipad") != -1
					}
				})(window.navigator.userAgent.toLowerCase());

				//iOS縺�縺｣縺溘ｉ
				if (_ua.iOS) {
					$('a,.c-hover').bind({
						'touchstart': function() {
							$(this).addClass( 'hover' );
						},
						'touchend': function() {
							$(this).removeClass( 'hover' );
						}
					});
				}
				//iOS莉･螟悶□縺｣縺溘ｉ
				else {
					$('a,.c-hover').bind({
						'mouseover': function() {
							$(this).addClass( 'hover' );
						},
						'mouseout': function() {
							$(this).removeClass( 'hover' );
						}
					});
				}
			},

			initPreLoader: function(){
				Common.trace("PRELOADER -> initPreLoader()");

				this.img_len = $('img').length;
				Common.trace("PRELOADER -> img len: " + this.img_len);

				Common.timeout_timer = setTimeout(function(){
					Common.hidePreLoader();
				}, 15000);

				if(this.img_len > 0) this.setPreLoader();
				else this.hidePreLoader();
			},

			setPreLoader: function(){
				var _this = this;

				Common.trace("PRELOADER -> setPreLoader()");

				// IE8縺ｮ蝣ｴ蜷医�縺吶＄縺ｫ繝医ャ繝苓｡ｨ遉ｺ縺ｫ遘ｻ繧�
				// if(Common.$body.hasClass("ie8")){
				// 	hidePreLoader();
				// 	return;
				// };


				for(var i = 0; i < this.img_len; i++){
					var _src = $('img:eq(' + i + ')').attr('src');
					_this.img_src_ary.push(_src);
					// Common.trace("PRELOADER -> img src: " + _src);
				};

				// 蛟句挨縺ｫ逕ｻ蜒上Ο繝ｼ繝�
				_this.img_src_ary.push('/shared/img/top/pc_visual01.jpg');
				_this.img_src_ary.push('/shared/img/top/sp_visual01.jpg');

				Common.trace(_this.img_src_ary.length);

				$(document).smartpreload({
					images: _this.img_src_ary,
					oneachimageload: function(src) {
						_this.loaded_img_len++;
						Common.onLoadUpdate();
					},
					onloadall: function() {
						Common.trace('PRELOADER :: All item is loaded.');
						Common.hidePreLoader();
					}
				});
			},

			onLoadUpdate: function(){
				var _this = this;

				_this.loaderd_per = Math.floor(100 / _this.img_src_ary.length * _this.loaded_img_len);
				var _per_str = String(_this.loaderd_per) + '%';

				// Common.trace('PRELOADER :: ' + _this.loaded_img_len + '/' + _this.img_src_ary.length + ' Loaded');
				Common.trace('PRELOADER :: ' + _this.loaderd_per + '% Loaded');

				// Common.$loader.find('.preloader__bar').css({ width: _per_str });
				// Common.$loader.find('.per').text(_per_str);

				if (_this.loaded_img_len == _this.img_src_ary.length){
					Common.trace('PRELOADER :: All item is loaded.');
				};
			},

			/* --------------------------------------------------------------------------
			 * 縺薙％縺ｾ縺ｧ縺ｯ邱ｨ髮�↑縺�
			 * -------------------------------------------------------------------------- */


			/* -----------------------------------------------
			 * PRE LOADER ANIMATION
			 * ----------------------------------------------- */
			showPreLoader: function(){
				Common.trace('PRELOADER -> showPreloader');

				Common.$body.css({ overflow: 'hidden' });

				// 繝医ャ繝励�縺ｨ縺阪□縺代Ο繝ｼ繝繝ｼ陦ｨ遉ｺ
				if( $("#top-page").length > 0 ){
					Common.$loader.show();
				}
				else{
					Common.$loader.remove();
				}
				
				// 繝ｭ繝ｼ繝繝ｼ蜃ｺ迴ｾ繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ
				Common.initPreLoader();
			},

			hidePreLoader: function(){
				Common.trace('PRELOADER -> hidePreLoader');

				// 繝ｭ繝ｼ繝繝ｼ蜑企勁繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ
				// Common.$loader.remove();
				this.init();
			},

			/* -----------------------------------------------
			 * 蛻晄悄蛹�
			 * ----------------------------------------------- */
			reload_count: 0,
			reload_count_max: 2,
			init: function(){
				Common.trace("Common -> init()");

				clearTimeout(Common.timeout_timer);
				Common.timeout_timer = null;

				/* -----------------------------------------------
				 * 繝壹�繧ｸJS縺ｮ貅門ｙ縺後〒縺阪※縺�↑縺代ｌ縺ｰ蜀崎ｵｷ
				 * ----------------------------------------------- */
				if(!Common.Page && this.reload_count < this.reload_count_max){
					this.reload_count++;
					setTimeout(Common.init, 500);
					return;
				};


				/* -----------------------------------------------
				 * 繝壹�繧ｸJS縺後≠繧後�螳溯｡�
				 * ----------------------------------------------- */
				Common.trace("Common settings -> " + Common.Page);
				if(Common.Page) {
					setTimeout(function(){
						// Common.trace("Common settings -> " + Common.Page);
						Common.Page.setupOnce();
					}, 30);
				}

				Common.buttonEvent();

				// 繝斐ャ繧ｯ繧｢繝��縺ｮ繧｢繝��繝��繝医′縺ゅｋ蝣ｴ蜷医∝聖縺榊�縺苓｡ｨ遉ｺ縺吶ｋ縺溘ａ縺ｫ蜿門ｾ�
				Common.checkPickupUpdate();

				// 繝壹�繧ｸ蜈ｨ菴捺�諤ｧ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ
				// Common.SmoothScroll.init();

				// 繝医ャ繝励□縺代�繧､繝ｳ繝医Ο縺ゅｋ縺九ｂ縺ｪ縺ｮ縺ｧ繝輔ぉ繝ｼ繝峨う繝ｳ蜃ｦ逅��蛟句挨縺ｫ
				if( $("#top-page").length > 0 ){
					return;
				}

				Common.pageFadeIn();
			},


			/* -----------------------------------------------
			 * 蜈ｱ騾壹�繧ｿ繝ｳ繧､繝吶Φ繝�
			 * ----------------------------------------------- */
			buttonEvent: function(){
				Common.trace("Common -> buttonEvent()");

				/* -----------------------------------------------
				 * 繝上Φ繝舌�繧ｬ繝ｼ繝懊ち繝ｳ
				 * ----------------------------------------------- */
				var _isHamOpen = false;
				$("#hamBtn a").on("click", function(e){
					e.preventDefault();
					if(!_isHamOpen){
						_isHamOpen = true;
						
						Common.$body.css({ overflow: 'hidden' });
						$(this).addClass('active');
						Common.$header.addClass('is__active');
						// TweenMax.to('#hamInner', .7, { top: 300, ease: Power2.easeInOut});

						$('#headerNav').css({ display: 'block' });
					}
					else{
						_isHamOpen = false;
						// TweenMax.to('#hamInner', .7, { top: 0, ease: Power2.easeInOut});
						
						Common.$body.css({ overflow: 'visible' });
						$(this).removeClass('active');
						Common.$header.removeClass('is__active');

						$('#headerNav').css({ display: 'none' });
					}
				});

				/* -----------------------------------------------
				 * 繧｢繝ｳ繧ｫ繝ｼ繧ｹ繝�繝ｼ繧ｹ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ
				 * ----------------------------------------------- */
				$(".ancor").on("click", function(e){
					e.preventDefault();
					var _target = $(this).attr('href');
					Common.autoScroll(_target, 800, 0, 0);
				});

				if(Common.LAYOUT_MODE == "pc"){
					/* -----------------------------------------------
					 * 繝輔ぉ繝ｼ繝峨�繧ｦ繧ｹ繧ｪ繝ｼ繝舌�
					 * ----------------------------------------------- */
					$(".fadeover a").hover(function() {
						$(this).velocity("stop").velocity({ opacity: 0.6 }, { duration: 200, easing: 'easeOutQuad' });
					}, function() {
						$(this).velocity("stop").velocity({ opacity: 1.0 }, { duration: 200, easing: 'easeOutQuad' });
					});
				}
				
				/* -----------------------------------------------
				 * PICKUP
				 * ----------------------------------------------- */
				// $('#pickup a, #pickupSp a').on("click", function(e){
				// 	e.preventDefault();

				// 	Common.$body.css({ overflow: 'hidden' });

				// 	// 驕ｸ謚槭＠縺溘ヴ繝�け繧｢繝��縺ｮ蜷咲ｧｰ蜿門ｾ�
				// 	var _target = $(this).attr('href').substr(1);

				// 	// 繝斐ャ繧ｯ繧｢繝��菴輔ｂ陦ｨ遉ｺ縺励※縺�↑縺�→縺阪�∈謚槭＠縺溘ヴ繝�け繧｢繝��繧ｳ繝ｳ繝�Φ繝��陦ｨ遉ｺ
				// 	if(!Common.is_show_pickup){
				// 		Common.setPickupContent(_target);
				// 	}
				// 	else{
				// 		Common.hidePickupContent(_target);
				// 	}

				// 	// 繝斐ャ繧ｯ繧｢繝��繧ｳ繝ｳ繝�Φ繝��繝｡繝九Η繝ｼ繧ｫ繝ｬ繝ｳ繝�
				// 	$(this).parent().addClass('is__current');

				// 	Common.is_show_pickup = true;
				// });
				
			},

			/* -----------------------------------------------
			 * 繝斐ャ繧ｯ繧｢繝��縺ｮ繧｢繝��繝��繝域律莉伜叙蠕�
			 * ----------------------------------------------- */
			checkPickupUpdate: function(){
				Common.trace("Common -> checkPickupUpdate()");

				// 蛻晄悄蛹�
				$('#infoupdatePC').css({ opacity: 0 });
				$('#musicupdatePC').css({ opacity: 0 });
				$('#movieupdatePC').css({ opacity: 0 });

				$.ajax('/pickup_update/', {
					timeout: 3000,
					datatype:'html'
				}).then(function(data){
					Common.trace('update file load success');
					var out_html = $($.parseHTML(data));
					// 繧､繝ｳ繝輔か繝｡繝ｼ繧ｷ繝ｧ繝ｳ
					var _infoDate = out_html.filter('#info')[0].innerHTML;
					$('#infoupdatePC').empty().append(_infoDate);
					$('#infoupdateSP').empty().append(_infoDate);
					Common.trace('info: ' + _infoDate);
					// 繝溘Η繝ｼ繧ｸ繝�け
					var _musicDate = out_html.filter('#music')[0].innerHTML;
					$('#musicupdatePC').empty().append(_musicDate);
					$('#musicupdateSP').empty().append(_musicDate);
					Common.trace('music: ' + _musicDate);
					// 繝�繝ｼ繝薙�
					var _movieDate = out_html.filter('#movie')[0].innerHTML;
					$('#movieupdatePC').empty().append(_movieDate);
					$('#movieupdateSP').empty().append(_movieDate);
					Common.trace('movie: ' + _movieDate);
					// 蜷ｹ縺榊�縺励ｒ陦ｨ遉ｺ
					TweenMax.fromTo('#infoupdatePC', .3, { y: 10, opacity: 0 }, { y: 0, opacity: 1, ease: 'easeOutQuart' });
					TweenMax.fromTo('#musicupdatePC', .3, { y: 10, opacity: 0 }, { y: 0, opacity: 1, ease: 'easeOutQuart' });
					TweenMax.fromTo('#movieupdatePC', .3, { y: 10, opacity: 0 }, { y: 0, opacity: 1, ease: 'easeOutQuart' });
				},function(jqXHR, textStatus) {
					Common.trace('update file load false');
					if(textStatus!=="success") {
						// 繧､繝ｳ繝輔か繝｡繝ｼ繧ｷ繝ｧ繝ｳ
						$('#infoupdatePC').remove();
						$('#infoupdateSP').remove();
						// 繝溘Η繝ｼ繧ｸ繝�け
						$('#musicupdatePC').remove();
						$('#musicupdateSP').remove();
						// 繝�繝ｼ繝薙�
						$('#movieupdatePC').remove();
						$('#movieupdateSP').remove();
					}
				});
			},

			/* -----------------------------------------------
			 * 繝斐ャ繧ｯ繧｢繝��縺ｮ陦ｨ遉ｺ
			 * ----------------------------------------------- */
			setPickupContent: function(_name){
				var _class = 'pick' + _name,
						_inner_class = '.pickblock__' + _name;

				$('#pickblock').addClass(_class);

				// 閭梧勹
				TweenMax.fromTo('#pickblockBg', .6, { x: -Common.Window.width, opacity: 1 }, { x: 0, ease: 'easeInOutCirc' });

				// 蜈ｨ菴薙�繧ｹ繧ｯ
				TweenMax.fromTo('#pickblock', .6, { display: 'block', x: Common.Window.width, width: 0, opacity: 1 }, { x: 0, width: '100%', ease: 'easeInOutCirc',
					onComplete: function(){
						$('#pickblock').find(_inner_class)
							.css({ display: 'table-cell', opacity: 0 })
							.velocity("stop")
							.velocity({ opacity: 1 }, { duration: 300, easing: 'easeOutQuad' });
					}});
			},

			/* -----------------------------------------------
			 * 繝斐ャ繧ｯ繧｢繝��縺ｮ髱櫁｡ｨ遉ｺ
			 * ----------------------------------------------- */
			hidePickupContent: function(_name){
				var _target = _name;
				$('#pickup li').removeClass('is__current');
				$('#pickblock').velocity("stop").velocity({ opacity: 0 }, { duration: 300, easing: 'easeOutQuad',
					complete: function(){
						Common.trace('pickup hide');
						$('#pickblock .pickblock__info, #pickblock .pickblock__music, #pickblock .pickblock__movie').css({ display: 'none' });
						$('#pickblock').removeClass('pickinfo pickmusic pickmovie');
						Common.setPickupContent(_target);
					}});
			},

			/* -----------------------------------------------
			 * 繧ｪ繝ｼ繝医せ繧ｯ繝ｭ繝ｼ繝ｫ
			 * ----------------------------------------------- */
			autoScroll: function(opt_hash, opt_duration, opt_delay, opt_offset){
				Common.trace('Common -> autoScroll()');

				var target_pos;
				var $taget = $(opt_hash);

				if(opt_hash == '#'){
					return;
				}

				target_pos = $(opt_hash).offset().top;
				
				Common.trace(target_pos);

				$taget
					.velocity("stop")
					.velocity(
						'scroll', {
							duration: opt_duration,
							delay: opt_delay,
							easing: "easeInOutQuart",
							offset: opt_offset
						});
			},

			/* -----------------------------------------------
			 * 繝ｪ繧ｵ繧､繧ｺ繧､繝吶Φ繝�
			 * ----------------------------------------------- */
			is_charaDetail: false,
			charaDetailH: 0,
			ResizeEvent: {
				init: function(){
					// 繧ｭ繝｣繝ｩ隧ｳ邏ｰ縺ｮ縺ｿ
					if( $("#charaDetail").length > 0 ){
						Common.is_charaDetail = true;
					}

					// // console.log(Common.Window.$window);
					// Common.Window.$window.off("resize");
					Common.Window.$window.on("resize", Common.ResizeEvent.onResize).trigger("resize");

				},
				onResize: function(e){
					// Common.trace("Common -> ResizeEvent -> onResize()");

					Common.Window.width = Common.Window.$window.width();
					Common.Window.height = Common.Window.$window.height();

					if(Common.Window.width <= 767){
						Common.LAYOUT_MODE = "sp";
					}
					else{
						if(Common.user_agent.Mobile){
							Common.LAYOUT_MODE = "sp";
						}else{
							Common.LAYOUT_MODE = "pc";
						};
					};

					if(Common.LAYOUT_MODE == "pc"){
						
						// 縺薙％縺九ｉ荳九く繝｣繝ｩ隧ｳ邏ｰ縺ｮ縺ｿ
						if(!Common.is_charaDetail) return;
						charaDetailH = $('#details').offset().top + $('#details').height();
						if(Common.Window.height >= charaDetailH){
							$('#detailVisual').css({ height: Common.Window.height });
						}
						else{
							$('#detailVisual').css({ height: charaDetailH });
						}

						// // PICKUP MUSIC
						// if($('#pickblock').hasClass('pickmusic')){
						// 	if(Common.Window.height < 900){
						// 		Common.trace('min');
						// 		$('.pickblock__music__content').css({ height: Common.Window.height-(97+$('.pickblock__music__title').height()) });
						// 	}
						// 	else{
						// 		Common.trace('auto');
						// 		$('.pickblock__music__content').css({ height: 'auto' });
						// 	}
						// }
						// // PICKUP MUSIC
						// else if($('#pickblock').hasClass('pickmovie')){
						// 	if(Common.Window.height < 930){
						// 		Common.trace('min');
						// 		$('.pickblock__movie__content').css({ height: Common.Window.height-(97+$('.pickblock__movie__title').height()) });
						// 	}
						// 	else{
						// 		Common.trace('auto');
						// 		$('.pickblock__movie__content').css({ height: 'auto' });
						// 	}
						// }
					}
					else{
						return;
					};

				}
			},

			/* -----------------------------------------------
			 * URL繧ｯ繧ｨ繝ｪ縺ｮ蜿門ｾ�
			 * ----------------------------------------------- */
			getParam: function( opt_key ){

				var url   = location.href;
				parameters    = url.split("?");
				if(parameters.length < 2) return false;
				params   = parameters[1].split("&");
				var paramsArray = [];
				for ( i = 0; i < params.length; i++ ) {
					neet = params[i].split("=");
					paramsArray.push(neet[0]);
					paramsArray[neet[0]] = neet[1];
				}
				var categoryKey = paramsArray[opt_key];
				return categoryKey;

			},

			/* -----------------------------------------------
			 * 繝ｦ繝ｼ繧ｶ繝ｼ繧ｨ繝ｼ繧ｸ繧ｧ繝ｳ繝医�蜿門ｾ�
			 * body繧ｿ繧ｰ縺ｫ繧ｨ繝ｼ繧ｸ繧ｧ繝ｳ繝亥錐繧偵け繝ｩ繧ｹ縺ｨ縺励※莉倅ｸ弱☆繧�
			 * ----------------------------------------------- */
			setUserAgent: function(){
				Common.trace("Common -> setUserAgent()");

				var ua = window.navigator.userAgent.toLowerCase();
				var ver = window.navigator.appVersion.toLowerCase();
				var name = 'unknown';

				if (ua.indexOf("msie") != -1){
					if (ver.indexOf("msie 6.") != -1){
						name = 'ie6';
					}else if (ver.indexOf("msie 7.") != -1){
						name = 'ie7';
					}else if (ver.indexOf("msie 8.") != -1){
						name = 'ie8';
					}else if (ver.indexOf("msie 9.") != -1){
						name = 'ie9';
					}else if (ver.indexOf("msie 10.") != -1){
						name = 'ie10';
					}else{
						name = 'ie';
					}
				}else if(ua.indexOf('trident/7') != -1){
					name = 'ie11';
				}else if (ua.indexOf('chrome') != -1){
					name = 'chrome';
				}else if (ua.indexOf('safari') != -1){
					name = 'safari';
				}else if (ua.indexOf('opera') != -1){
					name = 'opera';
				}else if (ua.indexOf('firefox') != -1){
					name = 'firefox';
				};

				Common.$body.addClass(name);
				if(ua.indexOf("mobile") != -1){
					Common.$body.addClass("mobile");
				};
				if(ua.indexOf("android") != -1){
					Common.$body.addClass("android");
				};

				return (function(u){

					var _is_ie = (u.indexOf('trident/7') > -1) || (u.indexOf('msie') > -1) && (u.indexOf('opera') == -1);

					return {
						Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
						|| u.indexOf("ipad") != -1
						|| (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
						|| (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
						|| u.indexOf("kindle") != -1
						|| u.indexOf("silk") != -1
						|| u.indexOf("playbook") != -1,
						Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
						|| u.indexOf("iphone") != -1
						|| u.indexOf("ipod") != -1
						|| (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
						|| (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
						|| u.indexOf("blackberry") != -1,
						Android: (u.indexOf("android") != -1),
						iOS:(u.indexOf("iphone") != -1)
						|| u.indexOf("ipod") != -1
						|| u.indexOf("ipad") != -1,
						IE: _is_ie,
						IE_VERSION: ( !_is_ie )? -1 : parseInt( u.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3] ),
						Chrome: (u.indexOf('chrome') > -1) && (u.indexOf('edge') == -1),
						Firefox: (u.indexOf('firefox') > -1),
						Safari: (u.indexOf('safari') > -1) && (u.indexOf('chrome') == -1),
						Opera: (u.indexOf('opera') > -1),
						Edge: (u.indexOf('edge') > -1)
					}
				})(ua);

			},

			/* -----------------------------------------------
			 * 繝壹�繧ｸ 繝輔ぉ繝ｼ繝峨�繧､繝ｳ
			 * ----------------------------------------------- */

			pageFadeIn: function(){
				Common.trace("pageFadeIn()");

				window.scrollTo(0,0);
				Common.$blind
					.addClass('origin100')
					.velocity("stop")
					.velocity({
						scaleX: 0
					},{
						// delay: 500,
						delay: 300,
						duration: 800,
						easing: 'easeInOutCirc',
						complete: function(){
							Common.$blind.hide();
							Common.$body.css({
								overflow: 'visible',
								width: '100%',
								height: '100%'
							});
							Common.$header.removeClass('is__moving');
						}
					});
			},

			trace: function( args ){
				if(!Common.DEBUG) return;
				// if (jQuery.browser.msie) {return};
				console.log("[trace]" + args);
			}

		};


	// 謌ｻ繧九�繧ｿ繝ｳ縺ｧ襍ｷ蜍輔＠縺ｪ縺�撫鬘後�蟇ｾ蠢懷�逅�
	window.onpageshow = function(event) {
		Common.trace("謌ｻ繧九�繧ｿ繝ｳ縺ｫ繧医ｋ蜀崎ｪｭ霎ｼ: 蛻､螳�");
		if (event.persisted) {
			Common.trace("謌ｻ繧九�繧ｿ繝ｳ縺ｫ繧医ｋ蜀崎ｪｭ霎ｼ: 繝ｪ繝ｭ繝ｼ繝�");
			$("#blind").css({
				opacity: 1,
				display: "block",
				height: Math.max.apply( null, [document.body.clientHeight , document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight])
			});
			alert("reload");
			window.location.reload();
			return;
		};
	};

	Common.setupOnce();
	window.Common = Common;


	/* -----------------------------------------------
	 * 繝壹�繧ｸ 繝輔ぉ繝ｼ繝峨�繧｢繧ｦ繝�
	 * ----------------------------------------------- */
	$("#headerNav a").on('click', function(e){
		e.preventDefault();
		$("#headerNav li").removeClass('is__current');
		$(this).parent().addClass('is__current');
		hidePage($(this));
	});

	$(".insite, .header__title a").on('click', function(e){
		e.preventDefault();
		hidePage($(this));
	});

	function hidePage($_target){
		Common.$header.addClass('is__moving');

		var $this = $_target;

		// 荳句ｱ､縺九ｉ繝医ャ繝励∈謌ｻ繧句�ｴ蜷医�縺ｿ
		if($this.hasClass('insite__top')){
			TweenMax.to('#header', .6, { y: -55, ease: 'easeInOutCirc' });
		}

		if($this.attr('target') == "_blank"){
			return;
		};

		var _color = $this.attr('data-color');

		Common.$blind
			.show()
			.removeClass('origin100')
			.addClass('origin0')
			.addClass(_color);

		TweenMax.fromTo('#blind', .6, { scaleX: 0 }, { scaleX: 1, ease: 'easeInOutCirc',
			onComplete: function(){
				// return;
				window.location = $this.attr('href');
				target = "_self";
			}});
	}


})(jQuery,window);

