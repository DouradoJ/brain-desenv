$(function(){ 
	(function() {
		var brainvest = {
	        init: function() {
	        this.firstaccess();
            this.menu();
            this.setDate();
            this.toTop('.toTop');
            this.carrossel();
            this.navgComoinvestir(1,$());
            this.nicescroll();
            this.fullscreen();
            this.rszWindow();
	        },
	        firstaccess : function(){
	        	$('main.inicial ul li a').click(function(e){
							$.cookie("language", $(this).attr('href').replace('.html',''), {expires:15, path:"/"});
	        	});
	        	if( $('main.inicial').length > 0 ){
		        	if( $.cookie('language') != undefined && $.cookie('language') != "undefined"){
		        		window.location.href = $.cookie('language')+'.html';
		        	}
	        	}
	        },
	        fullscreen : function(){
	            if( $.cookie('fullscreen') == "true" ){
	            	$('html').addClass('full');
	            }else{
	            	$('html').removeClass('full');
	            }
				$("section.carrossel > div").data('owlCarousel').destroy();
				setTimeout(function(){brainvest.carrossel();},500);
	        },
	        setDate : function(){
	        	$('main section.comoInvestir ul li span.as').html( 'a partir de '+ brainvest.currDate() );
	        },
	        menu: function() {
        		var _opnd, _c;
	        	$('main header nav.menu a').unbind('click').click(function(){
	        		//To Full Screen Mode
	        		if($(this).hasClass('s_fullscreen')){
	        			if( $('html').hasClass('full') ){
	        				$('html').removeClass('full');
	        				$.cookie("fullscreen", false, {expires:1, path:"/"});
	        			}else{
	        				$('html').addClass('full');
	        				$.cookie("fullscreen", true, {expires:1, path:"/"});
	        			}
								$("section.carrossel > div").data('owlCarousel').destroy();
								setTimeout(function(){brainvest.carrossel();},500);
	        		}
	        	}).hover(
	        		function(){
	        			clearInterval(_c);
	        			$('main header nav.s_menu, main header nav.s_language, main header nav.s_navg').hide();
	        			$('main header nav.'+$(this).attr('data-menu')).show();
	        		},
	        		function(){
	        			_c = setInterval(function(){
	        				$('main header nav.s_menu, main header nav.s_language, main header nav.s_navg').hide();
	        			}, 500);
	        		}
	        	);
	        	$('main header nav').not('.menu').hover(
	        		function(){ clearInterval(_c); },
	        		function(){
	        			_c = setInterval(function(){
	        				$('main header nav.s_menu, main header nav.s_language, main header nav.s_navg').hide();
	        			}, 500);
	        		}
	        	)
	        },
	        toTop : function(elem){
		        var offset = 1;
		        var duration = 500;
		        jQuery(window).scroll(function() {
					if( !$('body main').attr('id') && $(window).width() > 1024 ){
						if (jQuery(this).scrollTop() > offset) {
							$('body main').addClass('internal');
						} else {
							$('body main').removeClass('internal');
						}
					}else{
						if( !$('body main').attr('id') ){
							$('body main').removeClass('internal');
						}
					}
				});
		        jQuery(elem).click(function(event) {
					event.preventDefault();
					jQuery('html, body').animate({scrollTop: 0}, duration);
					return false;
		        })
	        },
	        carrossel: function() {
					  var owl = $("section.carrossel > div"); 
					  owl.owlCarousel({
							slideSpeed : 1500,
							paginationSpeed : 1000,
							singleItem:true,
							autoPlay:4000
					  }); 
	        },
	        navgComoinvestir : function(p,b){
	        	var _curr = p;
	        	b.hide();
	        	if(_curr > 0){
	        		var els = $('main.internal#como-investir section.passos article');
						els.hide();
	        		var total = els.length;
	        		var curr = els.parent().find('.passo-0'+p);
	        		if(total > 0  && _curr <= total){
	        			curr.fadeIn('fast', function(){ 
		        			( _curr == 1 ) ? $('main.internal#como-investir section.passos > nav a:first-child').hide() : $('main.internal#como-investir section.passos > nav a:first-child').show();
		        			( _curr < total ) ? $('main.internal#como-investir section.passos > nav a:last-child').show() : $('main.internal#como-investir section.passos > nav a:last-child').hide();
	        			});
	        		}
	        	}
	        	
	        	//Click Event
	        	$('main.internal#como-investir section.passos > nav a:first-child').click(function(){
	        		_curr--;
	        		brainvest.navgComoinvestir(_curr, $(this));
	        	});
	        	$('main.internal#como-investir section.passos > nav a:last-child').click(function(){
	        		_curr++;
	        		brainvest.navgComoinvestir(_curr, $(this));
	        	});

	        	//Close Button - Passo 04
	        	$('main.internal#como-investir section.passos article.passo-04 aside > div > p a').click(function(){
	        		$(this).parent().next('div').fadeIn('fast', function(){
						$(this).find('>a').click(function(){
		        			$(this).parent().fadeOut('fast');
		        		});
	        		});
	        	});
	        	//Close Button - Passo 05
	        	$('main.internal#como-investir section.passos article.passo-05 aside > div:first-child a').click(function(){
	        		$(this).next('div').fadeIn('fast', function(){
						$(this).find('>a').click(function(){
		        			$(this).parent().fadeOut('fast');
		        		});
	        		});
	        	});
	        },
	        nicescroll : function(){
			    var _el = $("main.internal#time section.quem-e > div.team dl dd p");
		    	if(_el.length > 0 && $(window).width() > 1024){
				    _el.niceScroll({
				      styler:"fb", 
				      cursorwidth: "3px",
				      cursorcolor:"#4c5246",
				      cursorborderradius: "0px",
				      background: "#c8c1b9",
				      scrollspeed: 100
				    });
				}
	        },
	        rszWindow : function () {
				$(window).resize(function() {
					if ($(window).width() < 1024){
						$('html').removeClass('full').find('main').removeClass('internal');
					}else{
						brainvest.fullscreen();
					}
				});
	        },
	        currDate : function(){
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!
				var yyyy = today.getFullYear();
				if(dd<10) { dd='0'+dd } 
				if(mm<10) { mm='0'+mm } 
				today = dd+'/'+mm+'/'+yyyy;
				return today;
	        }
    	}
		brainvest.init();
	})();
});