/* Author: I Plan Websites .com  */

$(document).ready(function() {


dev = true;

lang = '';//just to make sure it's global?
/////////////// UTILS - not project specefic
  
 
$(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 100); //throttle: time to wait after the resize is done...
});



$(window).scroll(function(){
	if(this.scrollingTo) clearTimeout(this.scrollingTo);
  this.scrollingTo = setTimeout(function() {
      $(this).trigger('scrollEnd');
  }, 300); //throttle: time to wait after the resize is done...

});


///////////// init + misc view functions
function initView(){
	//fadeIn animation
	$('#seo').remove();
	if(Modernizr.transition){
		var introDuration = 3000;
	}else{
		var introDuration = 0;
	}
	$("#cache img").one('load', function() {//FADE IMG on load...
	  $(this).removeClass('loading');
	}).each(function() {
	  if(this.complete) $(this).load(); //fix caching event not firing
	});
	
	$('#cache').delay(2200).queue(function(next){
		$('#cache').addClass('invisible').delay(1200).queue(function(next){
			$('#cache').remove(); //we remove the DOM node once anim is over...
			next();
		});
	});//eo second queue..
	
	if(dev){$('#cache').remove();} //no anim, right away!
	
	$(window).bind('resizeEnd adjustCssSizes', function() {
	    //do something, window hasn't changed size in 500ms
	    var window_h = $(window).height() ;
			var gal_h = window_h - (65 + 40);  //these are the footer + header height...
			if(gal_h >=800){gal_h=800}//set max height
			$('section#home').css('height', gal_h);
			$('section#info').css('height', gal_h);
			$('section#bio').css('height', gal_h);
			$('section#credit').css('height', gal_h);
			// ALSO adjust Width accordingly???
			
			/// !!! IEFIX
			// $('#home').width( 5000 ); //Hardcoded !! we'd need the gal ratio + nbImg objects...
			
	});
	$(window).trigger('adjustCssSizes'); //we also trigger the view fix on init 
	
	

	$(window).bind('scrollEnd', function(){
		var left = $(window).scrollLeft() ;
		//	alert('left = ' + left);
		if( left < 20){
			$('#prev').addClass('off');
		}else{
			$('#prev').removeClass('off');
		}
	})

	//bind mouse-wheel event :)
	$(function() {
	   $(window).mousewheel(function(event, delta) {
				// src: http://css-tricks.com/snippets/jquery/horz-scroll-with-mouse-wheel/
	      event.preventDefault();
				var scroll = $(window).scrollLeft();
				$(window).scrollLeft(scroll - (delta * 30));
	   });
	});


	//language selection
	//if user already visited the website, check the cookie
	//else, use the browser language, default to FR.
	
	if( $.cookie('lang') == 'en' ||  $.cookie('lang') == 'fr'){
		myLang = $.cookie('lang');
	}else{ //no cookies, check browser lang...
		browserLang = browsLang();
		browserLang = browserLang.substr(0,2);
		if( browserLang =='en'){
			myLang = 'en';
		}else{ 
			myLang = 'fr';
		}
	}

	sammy.run('/#/'+myLang);
	
}


// browser detect - returns the users browsers language preference
function browsLang() {
	return ( navigator.language || navigator.userLanguage );
}
	
	
function setLang(langParam){
	//alert('setLang = ' +langParam);

 if (lang != langParam){
	if(langParam == "fr"){
		lang = 'fr';
		$('body').addClass('fr');
		$('body').removeClass('en');
	}else{
		lang = 'en';
		$('body').addClass('en');
		$('body').removeClass('fr');
	}
	
	//TODO: LANG! re-render all templates...
	$('section#home.inDom, section#credit.inDom, section#bio.inDom, section#info.inDom, footer.inDom, header.inDom').addClass('toUpdate'); //this way, cached templates will be refreshed...
 	$.cookie('lang', lang);  //save it for future use...
}

}


function renderTemplate(context, elem, path, templateData, cache, callback){
	if( $(elem).hasClass('inDom') && cache && (!($(elem).hasClass("toUpdate")))  ){
		if($.isFunction(callback)){
			callback(context); //if temlate already loaded, we just call the callBakc right away.
		}
	}else{  //we refresh the template
	  context.render(path, templateData)
	   .replace(context.$element(elem)).then(function(content) {
				$(elem).addClass('inDom');
				$(elem).removeClass('toUpdate');
				if($.isFunction(callback)){
					callback(context);
				}
	  });
	}
}


function initTemplates(context, callbackHome){
	
	renderTemplate(context, 'footer', '/templates/footer.html', {title: "hello!"}, true);
	renderTemplate(context, 'header', '/templates/header.html', {title: "hello!"}, true, function(context){
		$('header .bt').unbind('click touch').bind('click touch', function() {//Adding action to header buttons (mindless of route changes)
			scrollBase();
		});
	});
	renderTemplate(context, 'section#info', '/templates/info.html', {title: "hello!"}, true);	
	renderTemplate(context, 'section#bio', '/templates/bio.html', {title: "hello!"}, true);	
	renderTemplate(context, 'section#credit', '/templates/credit.html', {title: "hello!"}, true);	
	renderTemplate(context, 'section#home', '/templates/home.html', {gal: Gallery.all()}, true, function(context){
		callbackHome(context);
		//bind action to next / prev bt
	
		$('#prev').unbind('click touch').bind('click touch', function(){
			//$(this).addClass('binded');
			pan(-5); //we want to return to menu, not just pan back...
			$('#prev').removeClass('off'); //just to bypass the throttle delay...
		});
		$('#next').unbind('click touch').bind('click touch', function(){
			$(this).addClass('binded');
			pan(1);
		});
	});
}

function scrollBase(){
	if(this.scrollBase) clearTimeout(this.scrollBase);
  this.scrollBase = setTimeout(function() {
      if($(window).scrollLeft() > 0){//  first check if we NEED to scroll there...
				$('html').scrollTo({ top:0, left:0, }, {duration:100}); 
			}
  }, 50); //throttle: //just to avoid double eventing
}

function pan(direction){ //-1:left,  1:right
	var amount =  $(window).width() -250; //use window . width - 100px...
	var offsetStr = '+='+ (amount*direction);
	$('html').scrollTo({ top:0, left:offsetStr, }, {duration:200});
}


function formatYear(yyyy){
	return yyyy.toString().slice(2);
}


function bodyClass(context, section){
 //if(! $('body').hasClass(section)){  //we make sure we don'T hcange class, if we remain in the same main section
	$('body').removeClass('info bio home col credit video photo');
	$('body').addClass(section);
	
	//alert('section = '+section);
	//we trigger page transition
	$('section.out').removeClass('out');//cleanup old animation leftover
	
	
	$('section.active').removeClass('active in').addClass('out').delay(1000).queue(function(next){
	 //$('section.out').removeClass('out'); //we remove the DOM node once anim is over...
	 		$('section.in').removeClass('in');  //let the new section animate to it's normal state.
			//also remove the 'out' class...
			$('section.out').removeClass('out'); 
		next();
	}); //eo queue
	$('section#'+section).addClass('in active');
 //}//end if
}





/////////////// MODEL CODE...

Gallery = Model("gallery", function() {
	  this.persistence(Model.localStorage);
		this.extend({
	    activate: function(name) {
				alert('this galery is active!');
	     // return this.detect(function() {
	     //   return  this.attr("na").toLowerCase() == name.toLowerCase()
	     // })
	    }
	  }) // eo extend
}); // eo model gallery


/////////////// ROUTES (SAMMY)
sammy = Sammy('body', function () {
			this.use('Storage');
		//this.use('Cache');
		this.use(Sammy.Template, "html");
		this.use('Title');
		this.use(Sammy.JSON);



		/////////////// LOAD ROUTE (homepage)
		this.get('/#/:lang', function (context) {
		setLang(this.params['lang']);
		
		initTemplates(context, function(context){
		
			if(! $('section#home').hasClass('visited') ){
				// $('html').scrollTo({ top:0, left:190 }, 50);  //disabled for now...
				
			}
			bodyClass(context, 'home');
			sammy.runRoute ( 'get', '/#/'+lang+'/photos/2012_spring'); //we load the current collection by default but don't stack in history!!
			
				
		});
	}); 


	///////////////
	this.get('/#/:lang/collections', function (context) {
		//This Route shows the menu, but doesn't change the content
		setLang(this.params['lang']);
		var col = this.params['col'];
		//alert("col = "+ col);
		bodyClass(context, 'home');
		scrollBase();
		initTemplates(context, function(context){
			if(! $('section#home .gallery').hasClass('loaded') ){
				sammy.runRoute ( 'get', '/#/'+lang+'/photos/2012_spring');  //if it's the first page, we load first collection...
			}
			//alert('call back!!');
		});
	}); 



	//////////////////
	this.get('/#/:lang/photos/:col', function (context) {
	//	alert('col route!!');
		setLang(this.params['lang']);
		var col = this.params['col'];
		bodyClass(context, 'home');
		//scrollBase();
		
		// $('html').scrollTo({ top:0, left:200 }, 200); //!! TWEAK value!
		$('html').scrollTo({ top:0, left:0 }, 200);
		var gal = Gallery.select(function() { //selecting the galery model (json bit)
		  return this.attr("id") == col
		}).first();
		$('header .btCol strong').text(gal.attr('season')[lang] +" "+ gal.attr('year'));
		initTemplates(context, function(context){
			//calculate gallery target W:
			var ratio = gal.attr('ratio'); //the ratio of images in the gallery, about 2:3
			var nbImg = gal.attr('nbImg');
			var h = $('#home .gallery').height();
			var w = h * nbImg * ratio + ((nbImg+1) * 5); 
		//	$('#home .gallery').width( 120 + w );  /// !!! IEFIX
			$('#home').width( 520 + w );  /// !!! IEFIX
			$('#home .gallery').width( 520 + w );  /// !!! IEFIX
			renderTemplate(context, '#home .gallery', '/templates/gal.html', {gal: gal}, false, function(context){  //false = no chache of templ.
					$('#home').addClass('photo_content');
					$('#home').removeClass('video_content');
					
					$('section#home .gallery').addClass('loaded'); //we knoe there's a leat one gallery loaded on page
					$('section#home').addClass('visited');// we'll know if it's the first pagview also.
					$('#home #navHome a.active').removeClass('active');//Interface FX (active bt)
					$('#home  #navHome a.'+col).addClass('active');
					$(".gallery img").one('load', function() {//FADE IMG on load...
					  $(this).removeClass('loading');
					}).each(function() {
					  if(this.complete) $(this).load(); //fix caching event not firing
					});
					$(".gallery img").unbind('click touch').bind('click touch', function() {//bind scrolling behavior on img clicks
						$('html').scrollTo(this, 300, {axis: 'x'});
						//alert('touch img');
					});
					
			}); // eo render
		}); //eo call back for initTemplate	
	}); // eo route

	///////////////////////
	
	
	this.get('/#/:lang/video/:col', function (context) {
		setLang(this.params['lang']);
		var col = this.params['col'];
		bodyClass(context, 'home');
		//scrollBase();
		
		// $('html').scrollTo({ top:0, left:200 }, 200); //!! TWEAK value!
		var gal = Gallery.select(function() { //selecting the galery model (json bit)
		  return this.attr("id") == col
		}).first();
		
		
		$('header .btCol strong').text(gal.attr('season')[lang] +" "+ gal.attr('year'));
		
		
		initTemplates(context, function(context){
			
			$('#home .gallery').width(0); //to test in IE
			
			renderTemplate(context, '#home .gallery', '/templates/vid.html', {video: '28364274'}, false, function(context){  //false = no chache of templ.
					
					$('section#home .gallery').addClass('loaded'); //we knoe there's a leat one gallery loaded on page
					$('section#home').addClass('visited');// we'll know if it's the first pagview also.
					$('#home #navHome a.active').removeClass('active');//Interface FX (active bt)
					$('#home  #navHome a.vid_'+col).addClass('active'); //!!!
				
				$('#home').removeClass('photo_content');
				$('#home').addClass('video_content');
				
				/*	$(".gallery img").one('load', function() {//FADE IMG on load...
					  $(this).removeClass('loading');
					}).each(function() {
					  if(this.complete) $(this).load(); //fix caching event not firing
					});
					
					$(".gallery img").unbind('click touch').bind('click touch', function() {//bind scrolling behavior on img clicks
						$('html').scrollTo(this, 300, {axis: 'x'});
						//alert('touch img');
					});*/
					
			}); // eo render
		}); //eo call back for initTemplate	
	}); // eo route

	///////////////////////
	
	
	this.get('/#/:lang/infos', function (context) {
		setLang(this.params['lang']);
		bodyClass(context, 'info');
		scrollBase();
		initTemplates(context, function(context){
			
			//alert('call back!!');
		});
	}); // eo route
	
	
	this.get('/#/:lang/bio', function (context) {
		setLang(this.params['lang']);
		bodyClass(context, 'bio');
		scrollBase();
		initTemplates(context, function(context){
			
			//alert('call back!!');
		});
	}); // eo route
	
	this.get('/#/:lang/credits', function (context) {
		setLang(this.params['lang']);
		bodyClass(context, 'credit');
		scrollBase();
		initTemplates(context, function(context){
			//alert('call back!!');
		});
	}); // eo route
	
});//eo sammy routes



/////////////// JSON data load

//if (Gallery.count() == 0){ //if it'S not in cache...
	$.getJSON('data/gallery.json', function(data) { //cached...
	  $.each(data, function(key, val) {
			var gal = new Gallery(val);
			gal.save();
	  }) //end of each...
	  
		initView(); // starts sammy and fadeIn
		// 
	});//eo json init
//}//end if!



});//eo doc ready
















