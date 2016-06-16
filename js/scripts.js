$(function(){ 
	(function() {
		var brainvest = {
	        init: function() {
	            this.menu();
	            this.carrossel();
	        },
	        menu: function() {
        		var _opnd;
	        	$('main header nav a').click(function() {
	        		$('main header nav.s_menu, main header nav.s_language').hide();
	        		if( $(this).attr('data-menu')!=undefined && $(this).attr('data-menu')!=null && $(this).attr('data-menu')!=_opnd ){
	        			$('main header nav.'+$(this).attr('data-menu')).show();
	        			 _opnd = $(this).attr('data-menu');
	        		}else{
	        			if($(this).attr('data-menu')==_opnd){
							_opnd = null;
	        			}
	        		}

	        	});
	        },
	        carrossel: function() {
			  var owl = $("section.carrossel > div"); 
			  owl.owlCarousel({
			    singleItem:true,
			  }); 
	        }
    	}
		brainvest.init();
	})();
});