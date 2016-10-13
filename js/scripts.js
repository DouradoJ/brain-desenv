$(function(){ 
	(function() {
		var brainvest = {
	        init: function() {
	        this.firstaccess();
	        //this.loadJson();
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
	        	var _host = (location.hostname.indexOf('www') > -1) ? location.hostname+'/' : location.hostname+'/brainvest/' ;
	        	var _path = location.pathname.substring(location.pathname.lastIndexOf('/'));

	        	//Click Event
	        	$('main.inicial ul li a, main header nav.s_language a').click(function(e){
					$.cookie("language", $(this).attr('lang'), {expires:15, path:"/"});
		        	window.location.href = 'http://'+_host+$.cookie('language') +_path;
	        	});
				//Redirect Event
		        if( $.cookie('language') != undefined && $.cookie('language') != "undefined" && $('main.inicial').length > 0){
		        	//console.log('asdas');
		        	window.location.href = 'http://'+_host+$.cookie('language') +'/';
			        //window.location.href = 'http://'+_host+'pt_br/';
					$.cookie("language", 'pt_br', {expires:15, path:"/"});
		        }
	        },
	        loadJson : function () {
				$.ajax({
					url : 'js/'+$.cookie("language")+'.js',
					dataType : 'json',
					success : function(json) { 
						console.log('Foi ' + json[0].home.highlight);
						brainvest.loadJsonContent();
					},
					error : function(r) { 
						console.log('Deu Erro');
					}
				});
	        },
	        loadJsonContent : function (argument) {
	        	
	        },
	        fullscreen : function(){
	            if( $.cookie('fullscreen') == "true" ){
	            	$('html').addClass('full');
	            }else{
	            	$('html').removeClass('full');
	            }
	            if( $("section.carrossel > div").lenght > 0 ){
					$("section.carrossel > div").data('owlCarousel').destroy();
					setTimeout(function(){brainvest.carrossel();},500);
				}
	        },
	        setDate : function(){
	        	var _lng = $('html').attr('lang');
				switch (_lng)
				{
                 case "pt_pt":
             		$('main section.comoInvestir ul li span.as').html( 'dados de '+ brainvest.currDate() );
                    break;
                 case "en":
             		$('main section.comoInvestir ul li span.as').html( 'data from '+ brainvest.currDate() );
                    break;
                 case "fr":
             		$('main section.comoInvestir ul li span.as').html( 'informations de  '+ brainvest.currDate() );
                    break;
                 default:
             		$('main section.comoInvestir ul li span.as').html( 'from '+ brainvest.currDate() );
                    break;
             }
	        },
	        menu: function() {
        		var _opnd, _c;
	        	$('main header nav.menu a').unbind('click').unbind('hover').click(function(){
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
	        		// less than 600 pixels width
	        		if( $(window).width() <= 600 ){
	        			$('main header nav.s_menu, main header nav.s_language, main header nav.s_navg, main header nav.s_acesso').hide();
	        			
	        			if( $(this).hasClass('active') ){
			        		$(this).removeClass('active');
			        		return;
		        		}else{
			        		$('main header nav a').removeClass('active');
			        		$(this).addClass('active');
							$('main header nav.'+$(this).attr('data-menu')).show();
		        		}
	        		}
	        	}).hover(
	        		function(){	        			
	        			if( $(window).width() > 600 ){
		        			clearInterval(_c);
		        			$('main header nav.s_menu, main header nav.s_language, main header nav.s_navg, main header nav.s_acesso').hide();
			        		$('main header nav a').removeClass('active');
		        			$('main header nav.'+$(this).attr('data-menu')).show();
	        				$(this).addClass('active');
        				}
	        		},
	        		function(){
	        			if( $(window).width() > 600 ){
		        			_c = setInterval(function(){
				        		$('main header nav a').removeClass('active');
		        				$('main header nav.s_menu, main header nav.s_language, main header nav.s_navg, main header nav.s_acesso').hide();
		        			}, 500);
	        			}
	        		}
	        	);
	        	$('main header nav').not('.menu').hover(
	        		function(){ 
	        			$(this).find('a').hover(function(){$(this).addClass('active');},function(){$(this).removeClass('active');})
	        			if( $(window).width() > 600 ){
	        				clearInterval(_c);
	        			}
	        		},
	        		function(){
	        			if( $(window).width() > 600 ){
		        			_c = setTimeout(function(){
		        				$('main header nav.s_menu, main header nav.s_language, main header nav.s_navg, main header nav.s_acesso').hide();
								$('main header nav a').removeClass('active');
		        			}, 500);
	        			}
	        		}
	        	)
	        },
	        toTop : function(elem){
		        var offset = 1;
		        var duration = 500;
		        jQuery(window).scroll(function() {
					if( !$('body main').attr('id') ){ //&& $(window).width() > 1024 
						if (jQuery(this).scrollTop() > offset) {
							$('body main').addClass('internal');
						} else {
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
				if(!owl.length) return -1;
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
	        		var curr = els.parent().find('#passo-0'+p);
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
						//$('html').removeClass('full').find('main').removeClass('internal');
						//$('html main').removeClass('internal');
					}else{
						brainvest.fullscreen();
					}
		        	$('main header nav.s_menu, main header nav.s_language, main header nav.s_navg, main header nav.s_acesso').hide();
					$('main header nav a').removeClass('active');
					brainvest.menu();
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