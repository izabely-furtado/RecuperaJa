(function($) {
    
    var hasAlreadyRun = false;

    Drupal.behaviors.Mangata = {
        attach: function(context, settings) {


            $(".main").onepage_scroll({
               sectionContainer: "section", // sectionContainer accepts any kind of selector in case you don't want to use section
               easing: "ease", // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in", "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
               animationTime: 900, // AnimationTime let you define how long each section takes to animate
               pagination: true, // You can either show or hide the pagination. Toggle true for show, false for hide.
               updateURL: false, // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
               loop: false
            });

            MenuOverlay();
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
                        closelnk: $("ul.onepage-pagination a"),
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
                        e.closelnk.click(function() {
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
                if ($('.menu-overlay').length > 0) {
                    Menu.init();
                }

                $(".submenu").hover(
                    function() {
                        $(this).parent().children('a').addClass("active");
                    },
                    function() {
                        $(this).parent().children('a').removeClass("active");
                    }
                );


            } //End MenuOverlay

            /*$(window).ready(function() {
            	MenuOverlayResponsive();			
            });
					
            $(window).on( 'resize', function () {
            	MenuOverlayResponsive();
            });*/

            if ($(".portfolio-container").length === 0) {

                // page-container div indicates a simple page (like 404), where we do not need any preloader or parallax stuff
                isSimplePage = ($(".page-container").length === 1);
                if (isSimplePage) {
                    $("#preloader").hide();
                }

                var $window = $(window);



                //new
/*                $("nav ul.categories li a").click(function() {
                    $("ul.categories li").removeClass("active");
                    $(this).parent().addClass("active");
                    var yPosition = $($(this).attr("href")).attr("data-y-pos");
                    console.log('ELEMENT: ' + $(this).attr("href"));
                    console.log('POSITION: ' + yPosition);
                    window.scrollTo(0, yPosition);
                    //	Menu.close();
                    return false;
                });
*/
 
                // sticker click, showing content with animation
                $(".link").click(function() {
                    var $this = $(this);

                    if ($this.attr("href") === "#") {
                        //$("#main-scenes").removeClass("bgw");
                        //var position = $this.closest("section").addClass("ov z12").find(".close").addClass("z12").end().attr("data-y-pos");
                       // var position = $this.closest("section").attr("data-y-pos");
                      //  if (window.pageYOffset == position) {
                            // hiding sticker button
                            //$this.addClass("hide");
                           // alert('1st');
                            $.fancybox.open($this.closest("section").find(".infograph"), {
                                autoSize: false,
                                autoHeight: false,
                                width: "100%",
                                height:"100%",
                                /*width: 1200,
                                height: 450,*/
                                type: "inline",
                                wrapCSS: $this.closest("section").attr("class"),
                                beforeShow: function() {
                                    // "disabling" scrolling
                                  //  $("body").css({'overflow-y':'hidden'});
                                 /*   $(window).bind("scroll", {
                                        position: position
                                    }, disableScrolling);*/
                                },
                                afterClose: function() {
                                   // $("body").css({'overflow-y':'visible'});
                                   // enableScrolling();
                                }
                            });
                            //showContent($this, position);
                     /*   } else {
                            $("html, body").animate({
                                scrollTop: position
                            }, 800, function() {
                                if (!hasAlreadyRun) {
                                    hasAlreadyRun = true;
                                    // hiding sticker button
                                    alert('2nd');
                                    //$this.addClass("hide");

                                    $.fancybox.open($this.closest("section").find(".infograph"), {
                                        autoSize: false,
                                        autoHeight: false,
                                        width: "100%",
                                        height:"100%",

                                        type: "inline",
                                        wrapCSS: $this.closest("section").attr("class"),
                                        beforeClose: function() {
                                            hasAlreadyRun = false;
                                        },
                                        beforeShow: function() {
                                            // "disabling" scrolling
                                          // $(window).bind("scroll", {
                                            //    position: position
                                            //}, disableScrolling);
                                        },
                                        afterClose: function() {
                                            enableScrolling();
                                        }
                                    });
                                    //showContent($this, position);
                                }
                            });
                        }*/
                        return false;
                    }
                });

                // close click, hiding content with animation
                /*$(".close").click(function() {
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
                });*/

            }
        }
    };

/*    function showContent($stickerElement, position) {
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
        $(".anim-part").animate({
            opacity: 0
        }, 500);

        // "disabling" scrolling
        $(window).bind("scroll", {
            position: position
        }, disableScrolling);

        $("#header").animate({
            top: -104
        }, 800);
        $stickerElement.parent().find(".split-up").animate({
            top: -243
        }, 800);
        $stickerElement.parent().find(".split-down").animate({
            top: 634
        }, 800, function() {
            hasAlreadyRun = false;
        });
    }*/


    /*function showCampaignDetails($campaignOverviewItem, position) {
        // fading out menu
        $("#primary").fadeOut();

        // setting left position to according campaign detail
        var $campaignsBand = $(".campaigns .campaigns-band");
        var $viewport = $campaignsBand.parent(".viewport");
        $campaignsBand.css("left", ($campaignOverviewItem.attr("data-camp-id") * $viewport.width() * -1));

        // "disabling" scrolling
        $(window).bind("scroll", {
            position: position
        }, disableScrolling);

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
    }*/


    function disableScrolling(event) {
        window.scrollTo(0, event.data.position);
       // alert('stop');
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
        for (var i = 0; i < positions.length; i++) {
            var pos_current = positions[i] - overlapFactor;
            var pos_next = (i < (positions.length - 1) ? positions[(i + 1)] - overlapFactor : -1);
            if (scrollPosition < pos_current) {
                activeIndex = 0;
                break;
            }
            if ((scrollPosition >= pos_current && scrollPosition < pos_next) || pos_next == -1) {
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
        // fade in page
        init();

        // news vertical sliding functionality
        $(".newsfeed .ctrls a").click(function() {
            var $slidingBand = $(".news-band");
            var $viewport = $slidingBand.parent(".viewport");
            var $newsContCount = $slidingBand.find(".news-3-cont").length;

            if ($(this).hasClass("down")) {
                // down click
                if (parseInt($slidingBand.css("top")) > (($newsContCount - 1) * $viewport.height() * -1)) {
                    $slidingBand.animate({
                        top: "-=" + $viewport.height()
                    }, 400);
                }
            } else {
                // up click
                if (parseInt($slidingBand.css("top")) < 0) {
                    $slidingBand.animate({
                        top: "+=" + $viewport.height()
                    }, 400);
                }
            }
            return false;
        });

        // to the top button functionality 
        $(window).scroll(function() {
            if ($(this).scrollTop() > 700) {
                $("button.toTheTop").addClass("visible");
            } else {
                $("button.toTheTop").removeClass("visible");
            }
        });
        $("button.toTheTop").click(function() {
            $('html,body').animate({
                scrollTop: 0
            }, 1000);
        });




        /*--------------------------------------------------
        Function Menu Overlay Responsive
        ---------------------------------------------------*/

        function MenuOverlayResponsive() {

            var winHeight = window.innerHeight
            var winWidth = window.innerWidth
            if (winWidth > 750) {
                $('.scr_menu').css({
                    height: winHeight - 250 + 'px',
                    width: winWidth + 25 + 'px'
                });
            } else {
                $('.scr_menu').css({
                    height: winHeight - 200 + 'px',
                    width: winWidth + 25 + 'px'
                });
            }

        } //End MenuOverlayNavPos		




    });

function init() {
    
    // start up after 2sec no matter what
    window.setTimeout(function(){
        start();
    }, 2000);
}
// fade in experience
function start() {
    
    $('body').removeClass("loading").addClass('loaded');
    
}

}(jQuery));