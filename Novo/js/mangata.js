var hasAlreadyRun = false;
var pauseAnim = false;
var isSimplePage = false;

(function($) {
	
	Drupal.behaviors.Mangata = {
		attach: function(context, settings) { 

            

			MenuOverlay();


			function removeHash () { 
 			   history.pushState("", document.title, window.location.pathname + window.location.search);
			}
			/*--------------------------------------------------
			Function Menu Overlay
			---------------------------------------------------*/
			function MenuOverlay() {	
				var Menu = {
					settings: {
						menubtn: $(".menu-btn"),
						menu: $(".menu-overlay"),
						navigation: $("header"),
						closebtn: $(".menu-close"), 
						closelnk: $("ul.categories a"),
						bg: $(".menu-bg"),
						container: $(".menu-container"),
						menuitem: $('a.no-action'),
						submenuitem: $('.submenu'),
						isOpen: !1,
						isAnimating: !1
					},
					init: function() {
						this.bindUIActions()
					},
					bindUIActions: function() {
						var e = this.settings;
						e.menubtn.click(function() {
							Menu.toggle()
						});
						e.bg.click(function() {
							Menu.close()
						});
						e.container.click(function() {
							Menu.close()
						});
						e.closelnk.click(function(){
							Menu.close()
						});
						e.closebtn.click(function() {
							Menu.close()
						});
						$(window).keydown(function(e) {
							e.which === 27 && Menu.close()
						});				
						e.submenuitem.click(function() {
							Menu.close()
						});				
						e.menuitem.click(function() {
							return false
						});
					},
					toggle: function() {
						var e = this.settings;
						e.isOpen ? Menu.close() : Menu.open()
					},
					open: function() {
						function t() {
							e.menu.addClass("is-active");
							e.closebtn.addClass("is-active");
							e.navigation.addClass("nav-up");
							e.isAnimating = !1
						//	$.each($('.menu-item'), function(i, el){setTimeout(function(){$(el).animate({'opacity':1.0});},500 + ( i * 80 ));});				
						}
						var e = this.settings;
						if (e.isAnimating === !1) {
							e.isOpen = !0;
							e.isAnimating = !0;
							e.menu.css("display", "block");
							setTimeout(t, 100)
						}
					},
					close: function() {
						//$.each($('.menu-item').get().reverse(), function(i, el){setTimeout(function(){$(el).css({'opacity':0});},1 + ( i * 60 ));});
						function t() {
							e.menu.css("display", "none");
							e.isAnimating = !1
						}
						var e = this.settings;
						if (e.isAnimating === !1) {
							e.isOpen = !1;
							e.isAnimating = !0;
							e.menu.removeClass("is-active");
							e.closebtn.removeClass("is-active");
							e.navigation.removeClass("nav-up");
							setTimeout(t, 1200)
						}
					}
				};
				if( $('.menu-overlay').length > 0 ){
					Menu.init();
				}
				
				$(".submenu").hover(
					function () {
					 	$(this).parent().children('a').addClass("active");
					}, function () {
					 	$(this).parent().children('a').removeClass("active");
					}
				);
			
			
			}//End MenuOverlay
	
					/*$(window).ready(function() {
						MenuOverlayResponsive();			
					});
					
					$(window).on( 'resize', function () {
						MenuOverlayResponsive();
					});*/
			
			
            if($(".portfolio-container").length === 0) {
    			// dirty safari hack
    			/*if($.browser.safari) {
    				$("#campaigns .split-up").css("top", "1px");
    			}*/
    			
    			// page-container div indicates a simple page (like 404), where we do not need any preloader or parallax stuff
    			isSimplePage = ($(".page-container").length === 1);
    			if(isSimplePage) {
    				$("#preloader").hide();
    			}

    			var $window = $(window);

    			// initially scrolling to home scene (hidden by preloader)
    			//var homeSectionPosition = $("#home").attr("data-y-pos");
    			//window.scrollTo(0, homeSectionPosition);

				var left_offset = $("#home .w1280").offset().left;
				var animData =
				[
					{
							scene: "#main-scenes",
							name: "",
							segments: [
									/*{ p:1600, pos:true, x:0, y:0 },
									{ p:2000, pos:true, x:0, y:-1700 },
									{ p:30000, pos:true, x:0, y:-8431 }*/
									{ p:0, pos:true, x:0, y:90 },
                                    { p:22772, pos:true, x:0, y:-5337 }
									//{ p:27772, pos:true, x:0, y:-6587 }
									//{ p:32772, pos:true, x:0, y:-7837 }
							]
					},
					{
							scene: "#main-scenes",
							name: ".maschine",
							segments: [
									/*{ p:2000, pos:true, x:430 + left_offset, y:-10 },
									{ p:5700, pos:true, x:430 + left_offset, y:750 }*/
									{ p:0, pos:true, x:430 + left_offset, y:36 },
									{ p:3472, pos:true, x:430 + left_offset, y:714 }
							]
					},
					{
							scene: "#main-scenes",
							name: ".typo_home",
							segments: [
									/*{ p:2000, pos:true, x:10 + left_offset, y:0 },
									{ p:3800, pos:true, x:10 + left_offset, y:400 },
									{ p:5700, pos:false, x:10 + left_offset, y:800 }*/
									{ p:0, pos:true, x:10 + left_offset, y:50 },
									{ p:3350, pos:true, x:10 + left_offset, y:750 }
									//{ p:1572, pos:true, x:10 + left_offset, y:400 }
									//{ p:3472, pos:false, x:10 + left_offset, y:650 }
							]
					},
					{
							scene: "#main-scenes",
							name: ".axt",
							segments: [
									/*{ p:2000, pos:true, x:560 + left_offset, y:-50, alpha:true, opacity:0, scale:false, size:[146,162], scaleSize:1 },
									{ p:2228, pos:true, x:560 + left_offset, y:-50, alpha:false, opacity:1, scale:true, size:[146,162], scaleSize:1 },
									{ p:3700, pos:true, x:580 + left_offset, y:520, alpha:true, opacity:1, scale:false, size:[73,81], scaleSize:0.5 },
									{ p:3800, pos:false, x:580 + left_offset, y:540, alpha:true, opacity:0, scale:false, size:[475,270], scaleSize:1 }*/
									{ p:0, pos:true, x:560 + left_offset, y:-50, alpha:false, opacity:1, scale:true, size:[146,162], scaleSize:1 },
									{ p:1472, pos:true, x:580 + left_offset, y:500, alpha:true, opacity:1, scale:false, size:[73,81], scaleSize:0.5 },
									{ p:1572, pos:false, x:580 + left_offset, y:520, alpha:true, opacity:0, scale:false, size:[475,270], scaleSize:1 }
							]
					},
					{
							scene: "#main-scenes",
							name: ".pilz_1",
							segments: [
									/*{ p:2000, pos:true, x:480 + left_offset, y:160, alpha:true, opacity:0, scale:false, size:[63,63] },
									{ p:2228, pos:true, x:480 + left_offset, y:160, alpha:false, opacity:1, scale:true, size:[63,63] },
									{ p:3700, pos:true, x:560 + left_offset, y:550, alpha:true, opacity:1, scale:false, size:[40,40] },
									{ p:3800, pos:false, x:560 + left_offset, y:560, alpha:true, opacity:0, scale:false, size:[40,40] }*/
									{ p:0, pos:true, x:480 + left_offset, y:160, alpha:false, opacity:1, scale:true, size:[63,63] },
									{ p:1472, pos:true, x:560 + left_offset, y:530, alpha:true, opacity:1, scale:false, size:[40,40] },
									{ p:1572, pos:false, x:560 + left_offset, y:540, alpha:true, opacity:0, scale:false, size:[40,40] }
							]
					},
					{
							scene: "#main-scenes",
							name: ".pilz_2",
							segments: [
									/*{ p:2000, pos:true, x:570 + left_offset, y:90, alpha:true, opacity:0, scale:false, size:[91,96] },
									{ p:2228, pos:true, x:570 + left_offset, y:90, alpha:false, opacity:1, scale:true, size:[91,96] },
									{ p:3700, pos:true, x:570 + left_offset, y:540, alpha:true, opacity:1, scale:false, size:[45,48] },
									{ p:3800, pos:false, x:570 + left_offset, y:560, alpha:true, opacity:0, scale:false, size:[91,96] }*/
									{ p:0, pos:true, x:570 + left_offset, y:90, alpha:false, opacity:1, scale:true, size:[91,96] },
									{ p:1472, pos:true, x:570 + left_offset, y:520, alpha:true, opacity:1, scale:false, size:[45,48] },
									{ p:1572, pos:false, x:570 + left_offset, y:540, alpha:true, opacity:0, scale:false, size:[91,96] }
							]
					},
					{
							scene: "#main-scenes",
							name: ".pilz_3",
							segments: [
									/*{ p:2000, pos:true, x:460 + left_offset, y:0, alpha:true, opacity:0, scale:false, size:[102,101] },
									{ p:2228, pos:true, x:460 + left_offset, y:0, alpha:false, opacity:1, scale:true, size:[102,101] },
									{ p:3700, pos:true, x:570 + left_offset, y:550, alpha:true, opacity:1, scale:false, size:[51,50] },
									{ p:3800, pos:false, x:570 + left_offset, y:570, alpha:true, opacity:0, scale:false, size:[51,50] }*/
									{ p:0, pos:true, x:460 + left_offset, y:0, alpha:false, opacity:1, scale:true, size:[102,101] },
									{ p:1472, pos:true, x:570 + left_offset, y:530, alpha:true, opacity:1, scale:false, size:[51,50] },
									{ p:1572, pos:false, x:570 + left_offset, y:550, alpha:true, opacity:0, scale:false, size:[51,50] }
							]
					},
					{
							scene: "#main-scenes",
							name: ".pilz_4",
							segments: [
									/*{ p:2000, pos:true, x:530 + left_offset, y:85, alpha:true, opacity:0, scale:false, size:[43,71] },
									{ p:2228, pos:true, x:530 + left_offset, y:85, alpha:false, opacity:1, scale:true, size:[43,71] },
									{ p:3700, pos:true, x:570 + left_offset, y:540, alpha:true, opacity:1, scale:false, size:[21,35] },
									{ p:3800, pos:false, x:570 + left_offset, y:560, alpha:true, opacity:0, scale:false, size:[21,35] }*/
									{ p:0, pos:true, x:530 + left_offset, y:85, alpha:false, opacity:1, scale:true, size:[43,71] },
									{ p:1472, pos:true, x:570 + left_offset, y:520, alpha:true, opacity:1, scale:false, size:[21,35] },
									{ p:1572, pos:false, x:570 + left_offset, y:540, alpha:true, opacity:0, scale:false, size:[21,35] }
							]
					},
					{
							scene: "#main-scenes",
							name: ".messer_1",
							segments: [
									/*{ p:2000, pos:true, x:565 + left_offset, y:165, alpha:true, opacity:0, scale:false, size:[32,113] },
									{ p:2228, pos:true, x:565 + left_offset, y:165, alpha:false, opacity:1, scale:true, size:[32,113] },
									{ p:3700, pos:true, x:590 + left_offset, y:540, alpha:true, opacity:1, scale:false, size:[16,56] },
									{ p:3800, pos:false, x:590 + left_offset, y:560, alpha:true, opacity:0, scale:false, size:[16,56] }*/
									{ p:0, pos:true, x:565 + left_offset, y:165, alpha:false, opacity:1, scale:true, size:[32,113] },
									{ p:1472, pos:true, x:590 + left_offset, y:520, alpha:true, opacity:1, scale:false, size:[16,56] },
									{ p:1572, pos:false, x:590 + left_offset, y:540, alpha:true, opacity:0, scale:false, size:[16,56] }
							]
					},
					{
							scene: "#main-scenes",
							name: ".messer_2",
							segments: [
									/*{ p:2000, pos:true, x:350 + left_offset, y:-20, alpha:true, opacity:0, scale:false, size:[146,142] },
									{ p:2228, pos:true, x:350 + left_offset, y:-20, alpha:false, opacity:1, scale:true, size:[146,142] },
									{ p:3700, pos:true, x:560 + left_offset, y:530, alpha:true, opacity:1, scale:false, size:[73,71] },
									{ p:3800, pos:false, x:560 + left_offset, y:550, alpha:true, opacity:0, scale:false, size:[73,71] }*/
									{ p:0, pos:true, x:350 + left_offset, y:-20, alpha:false, opacity:1, scale:true, size:[146,142] },
									{ p:1472, pos:true, x:560 + left_offset, y:510, alpha:true, opacity:1, scale:false, size:[73,71] },
									{ p:1572, pos:false, x:560 + left_offset, y:530, alpha:true, opacity:0, scale:false, size:[73,71] }
							]
					},
					{
							scene: "#main-scenes",
							name: ".saege",
							segments: [
									{ p:0, pos:true, x:260 + left_offset, y:470, rotate:true, degrees:-0 },
									{ p:272, pos:true, x:260 + left_offset, y:470, rotate:true, degrees:-20 },
									{ p:572, pos:true, x:260 + left_offset, y:510, rotate:true, degrees:0 },
									{ p:872, pos:true, x:260 + left_offset, y:550, rotate:true, degrees:-20 },
									{ p:1172, pos:true, x:260 + left_offset, y:590, rotate:true, degrees:0 },
									{ p:1372, pos:true, x:260 + left_offset, y:630, rotate:true, degrees:-20 },
									{ p:1672, pos:true, x:260 + left_offset, y:650, rotate:true, degrees:0 },
									{ p:1972, pos:true, x:260 + left_offset, y:670, rotate:true, degrees:-20 },
									{ p:3772, pos:true, x:260 + left_offset, y:900, rotate: true, degrees:0 }
							]
					},
					{
							scene: "#main-scenes",
							name: ".typo_story",
							segments: [
									/*{ p:3500, pos:true, x:140 + left_offset, y:1380 },
									{ p:6565, pos:true, x:140 + left_offset, y:1080 },
									{ p:7700, pos:false, x:140 + left_offset, y:800 }*/
									{ p:1072, pos:true, x:140 + left_offset, y:1530 },
									{ p:4137, pos:true, x:140 + left_offset, y:1230 },
									{ p:5272, pos:false, x:140 + left_offset, y:950 }
							]
					},
					{
							scene: "#main-scenes",
							name: ".baum",
							segments: [
									{ p:1372, pos:true, x:800 + left_offset, y:1500 },
									{ p:4137, pos:true, x:800 + left_offset, y:985 },
									{ p:5072, pos:true, x:800 + left_offset, y:600 }
							]
					},
					{
							scene: "#main-scenes",
							name: ".feuer",
							segments: [
									{ p:1372, pos:true, x:-80 + left_offset, y:2580 },
									{ p:4137, pos:true, x:-80 + left_offset, y:1230 },
									{ p:6572, pos:false, x:-80 + left_offset, y:800 }
							]
					},
					{
							scene: "#main-scenes",
							name: ".typo_branding",
							segments: [
									{ p:4000, pos:true, x:0 + 14.5*left_offset, y:2100 }, 
									{ p:8100, pos:true, x:40 + 14.5*left_offset, y:2200 }
							]
					},	
					{
							scene: "#main-scenes",
							name: ".planets",
							segments: [
									{ p:0, pos:true, x:0 + left_offset, y:1850 }, 
									{ p:8700, pos:true, x:0 + left_offset, y:1700 },
							]
					},
					{
							scene: "#main-scenes",
							name: ".ring",
							segments: [

									{ p:4772, pos:true, x:80 + left_offset, y:2250 },
									{ p:10975, pos:false, x:80 + left_offset, y:2700 }
							]
					},
					{
							scene: "#main-scenes",
							name: ".typo_transmedia",
							segments: [
									{ p:4572, pos:true, x:-10 + left_offset, y:1950 },
									//{ p:10775, pos:true, x:-10 + left_offset, y:2950 },
									{ p:11372, pos:true, x:-10 + left_offset, y:3150 }
							]
					},
					{
							scene: "#main-scenes",
							name: ".tiere",
							segments: [
									{ p:10172, pos:true, x:190 + left_offset, y:4400 },
									{ p:13458, pos:true, x:190 + left_offset, y:4200 },
									{ p:17772, pos:false, x:190 + left_offset, y:3700 }
							]
					},
					{
							scene: "#main-scenes",
							name: ".typo_profiles",
							segments: [
									{ p:9472, pos:true, x:0 + left_offset, y:4700 },
									{ p:13885, pos:true, x:0 + left_offset, y:3800 },
									{ p:16605, pos:false, x:0 + left_offset, y:3900 }
							]
					},
					{
							scene: "#main-scenes",
							name: ".werkzeug",
							segments: [
									{ p:14972, pos:true, x:0 + left_offset, y:4400 },
									{ p:16117, pos:true, x:150 + left_offset, y:4500 },
									{ p:18905, pos:true, x:450 + left_offset, y:4500 }
							]
					},
					{
							scene: "#main-scenes",
							name: ".anlage",
							segments: [
									{ p:16072, pos:true, x:0, y:4200 },
									{ p:19760, pos:true, x:0, y:4700 }
							]
					},
					{
							scene: "#main-scenes",
							name: ".blitz",
							segments: [
									{ p:17172, pos:true, x:900 + left_offset, y:4770, scale:true, size:[310, 400], alpha:true, opacity:0 },
									{ p:18172, pos:true, x:900 + left_offset, y:4770, scale:true, size:[310, 400], alpha:false, opacity:1 },
									{ p:18722, pos:true, x:1000 + left_offset, y:4770, scale:true, size:[250, 323] },
									{ p:19272, pos:true, x:900 + left_offset, y:4770, scale:true, size:[310, 400] },
									{ p:19922, pos:true, x:1000 + left_offset, y:4770, scale:true, size:[250, 323] },
									{ p:20372, pos:true, x:900 + left_offset, y:4770, scale:true, size:[310, 400] },
									{ p:21022, pos:true, x:1000 + left_offset, y:4770, scale:true, size:[250, 323] }
							]
					},
					{
							scene: "#main-scenes",
							name: ".typo_brand",
							segments: [
									{ p:18272, pos:true, x:505 + left_offset, y:4200 },
									{ p:18900, pos:true, x:505 + left_offset, y:4880 },
									{ p:20150, pos:true, x:505 + left_offset, y:5060 },
									{ p:22300, pos:true, x:505 + left_offset, y:4700 }
							]
					}

					
				];

			// initialize parallax magic
			Gbi.anim.init(animData, {
				easingFactor: 0.05,
				timingFactor: 1
			});


			// observing scroll position to change header and menu
			var scrollTimer;
			var scrollStoppedTimer;
			var nSections = $("section.menu").length;
			$window.scroll(function() {
				// for the sake of UI responsiveness
				clearTimeout(scrollTimer);
                clearTimeout(scrollStoppedTimer);
				scrollTimer = setTimeout(function() {
                var offset = window.pageYOffset;
                				
				/*if(offset < homeSectionPosition) {
					$("#header").addClass("fff");
				}
				else {
					$("#header").removeClass("fff");
				}*/
				var activeIndex = setMenuItemActive(offset);

				}, 100);                      
			});



			// menu
			$("#primary h3 a").click(function(event){
				$("#primary").toggleClass("active");
				return false;
			});

			//old
			$("#primary ul:not(.list-nav-social) li a:not(.nav-secondary)").click(function() {
				$("#primary li").removeClass("active");
				$(this).parent().addClass("active");
				var yPosition = $($(this).attr("href")).attr("data-y-pos");
    		window.scrollTo(0, yPosition);
 				return false;
 			});
 	
 			// test
 			$("a.logo-n10xtnd").click(function() {
				$("ul.categories li").removeClass("active");
				window.scrollTo(0, 5026);
				//	Menu.close();
 				return false;
 			});
  			$("a.logo-n10").click(function() {
				$("ul.categories li").removeClass("active");
				window.scrollTo(0, 0);
				//	Menu.close();
 				return false;
 			});				

 			//new
			$("nav ul.categories li a").click(function() {
				$("ul.categories li").removeClass("active");
				$(this).parent().addClass("active");
				var yPosition = $($(this).attr("href")).attr("data-y-pos");
				window.scrollTo(0, yPosition);
				//	Menu.close();
 				return false;
 			});

    			// campaign details, loading them all via ajax
    			$(".campaign-list a[data-camp-id]").each(function() {
    				var url = $(this).attr("href");
    				var id = $(this).attr("data-camp-id");
    				$.get(url, function(data) {
    					$(".campaigns article[data-camp-id='" + id + "']").html(data);
    				});
    			});

    			// campaign detail, gallery sliding
    			$(".campaigns .media-slider .nav-small").live("click", function() {
    				var $article = $(this).closest("article");
    				var $viewport = $article.find(".media-slider .viewport");
    				var $slidingBand = $viewport.find(".cf");
    				var $imageCount = $slidingBand.find("> li").length;
    				var $currentImageNotice = $article.find(".counter .current");

    				if($(this).hasClass("next")) {
    					// next click
    					if(parseInt($slidingBand.css("left")) > (($imageCount - 1) * $viewport.width() * -1)) {
    						stopAllVideosInJwPlayer();
    						$slidingBand.animate({
    							left: "-=" + $viewport.width()
    						}, 400);
    						$currentImageNotice.text(parseInt($currentImageNotice.text()) + 1);
    					}
    				}
    				else {
    					// prev click
    					if(parseInt($slidingBand.css("left")) < 0) {
    						stopAllVideosInJwPlayer();
    						$slidingBand.animate({
    							left: "+=" + $viewport.width()
    						}, 400);
    						$currentImageNotice.text(parseInt($currentImageNotice.text()) - 1);
    					}
    				}
    				return false;
    			});

    			// campaign detail, campaign sliding
    			$(".campaigns .content-slider .nav").live("click", function() {
    				var $viewport = $(this).siblings(".viewport");
    				var $slidingBand = $viewport.find(".campaigns-band");
    				var $imageCount = $slidingBand.find("> article").length;

    				if($(this).hasClass("next")) {
    					// next click
    					if(parseInt($slidingBand.css("left")) > (($imageCount - 1) * $viewport.width() * -1)) {
    						$slidingBand.animate({
    							left: "-=" + $viewport.width()
    						}, 400, function() {
    							// resetting all gallerys to first image
    							resetGalleries();
    							stopAllVideosInJwPlayer();
    						});
    					}
    				}
    				else {
    					// prev click
    					if(parseInt($slidingBand.css("left")) < 0) {
    						$slidingBand.animate({
    							left: "+=" + $viewport.width()
    						}, 400, function() {
    							// resetting all gallerys to first image
    							resetGalleries();
    							stopAllVideosInJwPlayer();
    						});
    					}
    				}
    				return false;
    			});

    			// closing campaign details if clicking beside
    			$("#campaign-closing-area, #campaigns .split-up, #campaigns .split-down").on("click", function() {
    				if($("#campaigns").hasClass("expanded")) {
    					$(".close:first").click();
    					return false;
    				}
    			});

    			// campaign overview, click
    			$(".campaign-list a").click(function() {
    				
    				// if campaign details are visible already, close it
    				if($("#campaigns").hasClass("expanded")) {
    					$(".close:first").click();
    					return false;
    				}
    				
    				var $this = $(this);
    				var position = $this.closest("section").attr("data-y-pos");
    				if(window.pageYOffset == position) {
    					showCampaignDetails($this, position);
    				}
    				else
    				{
    					$("html, body").animate({
    						scrollTop: position
    					}, 800, function() {
    						showCampaignDetails($this, position);
    					});
    				}
    				return false;
    			});


    			// sticker click, showing content with animation
    			$(".sticker").click(function() {
    				var $this = $(this);
				
					if($this.attr("href") === "#") {
						//$("#main-scenes").removeClass("bgw");
						//var position = $this.closest("section").addClass("ov z12").find(".close").addClass("z12").end().attr("data-y-pos");
						var position = $this.closest("section").attr("data-y-pos");
						if(window.pageYOffset == position) {
							// hiding sticker button
							//$this.addClass("hide");

							$.fancybox.open($this.closest("section").find(".infograph"), { 
                                autoSize: false,
                                autoHeight: false,
                               	width: "100%",
                                maxWidth: 1200,
                                height:"100%",
                                /*width: 1200,
                                height: 450,*/
                                type: "inline",
								wrapCSS: $this.closest("section").attr("class"),
								beforeShow: function() {
									// "disabling" scrolling
									$(window).bind("scroll", {position: position}, disableScrolling);
								},
								afterClose: function() {
									enableScrolling();
								}
							});
							//showContent($this, position);
						}
						else
						{
							$("html, body").animate({
								scrollTop: position
							}, 800, function() {
								if(!hasAlreadyRun) {
									hasAlreadyRun = true;
									// hiding sticker button
									//$this.addClass("hide");

									$.fancybox.open($this.closest("section").find(".infograph"), { 
		                                autoSize: false,
		                                autoHeight: false,
		                                width: "100%",
                               			maxWidth: 1200,
		                                height:"100%",
		                                /*width: 1200,
		                                height: 450,*/
		                                type: "inline",
										wrapCSS: $this.closest("section").attr("class"),
										beforeClose: function() {
											hasAlreadyRun = false;
										},
										beforeShow: function() {
											// "disabling" scrolling
											$(window).bind("scroll", {position: position}, disableScrolling);
										},
										afterClose: function() {
											enableScrolling();
										}
									});
									//showContent($this, position);
								}
							});
						}
						return false;
					}
				});

    			// close click, hiding content with animation
    			$(".close").click(function() {
    				// fading in menu
    				$("#primary").fadeIn();
    				
    				stopAllVideosInJwPlayer();
    				resetGalleries();
    				
    				var $currentSection = $(this).closest("section");
    				$currentSection.find(".close").removeClass("z12");
    				//var topValue = (($.browser.safari && $currentSection.attr("id") == "campaigns") ? 1 : 0); // dirty hack for safari
    				var topValue = 0;
    				$("#header, .split-up").animate({
    					top: topValue
    				}, 800);
    				$(".split-down").animate({
    					top: 348
    				}, 800, function() {
    					$currentSection.removeClass("expanded ov z12");
    					$("#main-scenes").addClass("bgw");

    					// making visible again animation parts
    					$(".anim-part").animate({
    						opacity: 1 
    					}, 100, function() { 
    						pauseAnim = false; 
    					});
    					// "enabling" scrolling again
    					enableScrolling();

    					// showing menu
    					$("#primary").animate({
    						opacity: 1
    					}, 100);
    				});

    				// repositioning of appendix container and next section
    				$currentSection.closest("section").find(".appendix").animate({
    					top: "-=286"
    				}, 800);
    				$currentSection.next("section").animate({
    					top: 0
    				}, 800);


    				// showing sticker button
    				$(".sticker").removeClass("hide");

    				// only relevant on campaigns section
    				$("#header").removeClass("min");
    				//$("#campaigns").removeClass("expanded");
    				$(".more").show();

    				return false;
    			});		
    			
    			var hash = window.location.hash;
				if (hash == '#goxtnd') {
				    window.scrollTo(0, 5026);
				    removeHash();
	 				return false;
				}
				
    			
    		}
        }
	};
	
	function showContent($stickerElement, position) {
		// hiding menu
		$("#primary").animate({
			opacity: 0
		}, 200);
		
		// repositioning of appendix container and next section
		$stickerElement.closest("section").find(".appendix").animate({
			top: "+=286"
		}, 800);
		$stickerElement.closest("section").next("section").animate({
			top: 286
		}, 800);
	
		// hiding animation parts
		pauseAnim = true;
		$(".anim-part").animate({ opacity: 0 }, 500);
		
		// "disabling" scrolling
		$(window).bind("scroll", {position: position}, disableScrolling);
		
		$("#header").animate({
			top: -104
			}, 800
		);
		$stickerElement.parent().find(".split-up").animate({
			top: -243
		}, 800);
		$stickerElement.parent().find(".split-down").animate({
			top: 634
		 }, 800, function() {
			 hasAlreadyRun = false;
		 });
	}


	function showCampaignDetails($campaignOverviewItem, position) {
		// fading out menu
		$("#primary").fadeOut();
		
		// setting left position to according campaign detail
		var $campaignsBand = $(".campaigns .campaigns-band");
		var $viewport = $campaignsBand.parent(".viewport");
		$campaignsBand.css("left", ($campaignOverviewItem.attr("data-camp-id") * $viewport.width() * -1));

		// "disabling" scrolling
		$(window).bind("scroll", { position: position }, disableScrolling);

		$("#campaigns").addClass("expanded");
		$("#header").animate({
			top: -104
		}, 800);
		$("#campaigns .split-up").animate({
			top: -313
		}, 800);
		$("#campaigns .split-down").animate({
			top: 601
		}, 800);
	}


	function disableScrolling(event) {
		window.scrollTo(0, event.data.position);
	}


	function enableScrolling() {
		$(window).unbind("scroll", disableScrolling);
	}

	function setMenuItemActive(scrollPosition) {
		var $sections = $("section.menu");
		var positions = [];
		$sections.each(function(i) {
			positions.push($(this).attr("data-y-pos"));
		});
		var overlapFactor = 1600;;
		var activeIndex = -1;
		for(var i = 0; i < positions.length; i++) {
			var pos_current = positions[i] - overlapFactor;
			var pos_next = (i < (positions.length - 1) ? positions[(i + 1)] - overlapFactor : -1);
			if(scrollPosition < pos_current) {
				activeIndex = 0;
				break;
			}
			if((scrollPosition >= pos_current && scrollPosition < pos_next) || pos_next == -1) {
				activeIndex = i;
				break;
			}
		}
		//$("ul.categories li").removeClass("active").eq(activeIndex).addClass("active");
        return activeIndex;
	}
	
	
	function resetGalleries() {
		$(".media-slider .viewport .cf").css("left", 0);
		$(".campaign .counter .current").text("1");
	}
	
	
	function stopAllVideosInJwPlayer() {
		$("*[name^='video-container-']").each(function() {
			jwplayer($(this).attr("id")).stop();
		});
	}


	// load event
	$(window).load(function() {
		if(!isSimplePage) {
			function doRun() {
				if(!pauseAnim) {
					Gbi.anim.run();
				}
				window.requestAnimationFrame(doRun);
			}
			window.requestAnimationFrame(doRun);


			$("#preloader").animate({
				opacity: 0
			}, 500, function() {

				// ready! hiding preloader
				$(this).hide();
				enableScrolling();
			});
		} else {
            enableScrolling();
        }

        
		// news vertical sliding functionality
		$(".newsfeed .ctrls a").click(function() {
			var $slidingBand = $(".news-band");
			var $viewport = $slidingBand.parent(".viewport");
			var $newsContCount = $slidingBand.find(".news-3-cont").length;

			if($(this).hasClass("down")) {
				// down click
				if(parseInt($slidingBand.css("top")) > (($newsContCount - 1) * $viewport.height() * -1)) {
					$slidingBand.animate({
						top: "-=" + $viewport.height()
					}, 400);
				}
			}
			else {
				// up click
				if(parseInt($slidingBand.css("top")) < 0) {
					$slidingBand.animate({
						top: "+=" + $viewport.height()
					}, 400);
				}
			}
			return false;
		});

		// to the top button functionality 
		$(window).scroll(function() {
			if($(this).scrollTop() > 700) {
				$("button.toTheTop").addClass("visible");
			} else {
				$("button.toTheTop").removeClass("visible");
			}
		});
		$("button.toTheTop").click(function() {
			$('html,body').animate({scrollTop: 0}, 1000);
		});
		
		
		

/*--------------------------------------------------
Function Menu Overlay Responsive
---------------------------------------------------*/	
	
	function MenuOverlayResponsive() {
	
		var winHeight = window.innerHeight
		var winWidth = window.innerWidth
		if (winWidth > 750) {
			$('.scr_menu').css( { 
				height : winHeight -250 + 'px',
				width : winWidth + 25 + 'px' 
			});
		} else {
			$('.scr_menu').css( { 
				height : winHeight -200 + 'px',
				width : winWidth + 25 + 'px' 
			});
		}
	
	}//End MenuOverlayNavPos		
		
		
		
		
	});
	
}(jQuery));
