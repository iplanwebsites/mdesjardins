/* Author: I Plan Websites .com  */$(document).ready(function(){function e(){$("#seo").remove();if(Modernizr.transition)var e=3e3;else var e=0;$("#cache img").one("load",function(){$(this).removeClass("loading")}).each(function(){this.complete&&$(this).load()});$("#cache").delay(2200).queue(function(e){$("#cache").addClass("invisible").delay(1200).queue(function(e){$("#cache").remove();e()})});dev&&$("#cache").remove();$(window).bind("resizeEnd adjustCssSizes",function(){var e=$(window).height(),t=e-105;t>=800&&(t=800);$("section#home").css("height",t);$("section#info").css("height",t);$("section#bio").css("height",t);$("section#credit").css("height",t)});$(window).trigger("adjustCssSizes");$(window).bind("scrollEnd",function(){var e=$(window).scrollLeft();e<20?$("#prev").addClass("off"):$("#prev").removeClass("off")});$(function(){$(window).mousewheel(function(e,t){e.preventDefault();var n=$(window).scrollLeft();$(window).scrollLeft(n-t*30)})});if($.cookie("lang")=="en"||$.cookie("lang")=="fr")myLang=$.cookie("lang");else{browserLang=t();browserLang=browserLang.substr(0,2);browserLang=="en"?myLang="en":myLang="fr"}sammy.run("/#/"+myLang)}function t(){return navigator.language||navigator.userLanguage}function n(e){if(lang!=e){if(e=="fr"){lang="fr";$("body").addClass("fr");$("body").removeClass("en")}else{lang="en";$("body").addClass("en");$("body").removeClass("fr")}$("section#home.inDom, section#credit.inDom, section#bio.inDom, section#info.inDom, footer.inDom, header.inDom").addClass("toUpdate");$.cookie("lang",lang)}}function r(e,t,n,r,i,s){$(t).hasClass("inDom")&&i&&!$(t).hasClass("toUpdate")?$.isFunction(s)&&s(e):e.render(n,r).replace(e.$element(t)).then(function(n){$(t).addClass("inDom");$(t).removeClass("toUpdate");$.isFunction(s)&&s(e)})}function i(e,t){r(e,"footer","/templates/footer.html",{title:"hello!"},!0);r(e,"header","/templates/header.html",{title:"hello!"},!0,function(e){$("header .bt").unbind("click touch").bind("click touch",function(){s()})});r(e,"section#info","/templates/info.html",{title:"hello!"},!0);r(e,"section#bio","/templates/bio.html",{title:"hello!"},!0);r(e,"section#credit","/templates/credit.html",{title:"hello!"},!0);r(e,"section#home","/templates/home.html",{gal:Gallery.all()},!0,function(e){t(e);$("#prev").unbind("click touch").bind("click touch",function(){o(-5);$("#prev").removeClass("off")});$("#next").unbind("click touch").bind("click touch",function(){$(this).addClass("binded");o(1)})})}function s(){this.scrollBase&&clearTimeout(this.scrollBase);this.scrollBase=setTimeout(function(){$(window).scrollLeft()>0&&$("html").scrollTo({top:0,left:0},{duration:100})},50)}function o(e){var t=$(window).width()-250,n="+="+t*e;$("html").scrollTo({top:0,left:n},{duration:200})}function u(e){return e.toString().slice(2)}function a(e,t){$("body").removeClass("info bio home col credit video photo");$("body").addClass(t);$("section.out").removeClass("out");$("section.active").removeClass("active in").addClass("out").delay(1e3).queue(function(e){$("section.in").removeClass("in");$("section.out").removeClass("out");e()});$("section#"+t).addClass("in active")}dev=window.location.hostname=="127.0.0.1";lang="";credits_info={en:{photo:"Photography",stylist:"Stylist(s)",da:"Artistic Direction",makeup:"Makeup",hair:"Hair",model:"Model",jewelry:"Jewelry",shoes:"shoes",accessories:"Accessories",assistantphoto:"Photo Assistant"},fr:{photo:"Photographe",stylist:"Styliste(s)",da:"Direction artistique",makeup:"Maquillage",hair:"Coiffure",model:"Mannequin(s)",jewelry:"Bijoux",shoes:"Chaussures",accessories:"Accessoires",assistantphoto:"Assistant photo"}};$(window).resize(function(){this.resizeTO&&clearTimeout(this.resizeTO);this.resizeTO=setTimeout(function(){$(this).trigger("resizeEnd")},100)});$(window).scroll(function(){this.scrollingTo&&clearTimeout(this.scrollingTo);this.scrollingTo=setTimeout(function(){$(this).trigger("scrollEnd")},300)});Gallery=Model("gallery",function(){this.persistence(Model.localStorage);this.extend({activate:function(e){alert("this galery is active!")}})});sammy=Sammy("body",function(){this.use("Storage");this.use(Sammy.Template,"html");this.use("Title");this.use(Sammy.JSON);this.get("/#/:lang",function(e){n(this.params.lang);i(e,function(e){!$("section#home").hasClass("visited");a(e,"home");sammy.runRoute("get","/#/"+lang+"/photos/2012_fall")})});this.get("/#/:lang/collections",function(e){n(this.params.lang);var t=this.params.col;a(e,"home");s();i(e,function(e){$("section#home .gallery").hasClass("loaded")||sammy.runRoute("get","/#/"+lang+"/photos/2012_fall")})});this.get("/#/:lang/photos/:col",function(e){n(this.params.lang);var t=this.params.col;a(e,"home");$("html").scrollTo({top:0,left:0},200);var s=Gallery.select(function(){return this.attr("id")==t}).first();$("header .btCol strong").text(s.attr("season")[lang]+" "+s.attr("year"));i(e,function(e){var n=s.attr("ratio"),i=s.attr("nbImg"),o=$("#home .gallery").height(),u=o*i*n+(i+2)*5;$("#home").width(520+u);$("#home .gallery").width(520+u);r(e,"#home .gallery","/templates/gal.html",{gal:s},!1,function(e){$("#home").addClass("photo_content");$("#home").removeClass("video_content");$("section#home .gallery").addClass("loaded");$("section#home").addClass("visited");$("#home #navHome a.active").removeClass("active");$("#home  #navHome a."+t).addClass("active");$(".gallery img").one("load",function(){$(this).removeClass("loading")}).each(function(){this.complete&&$(this).load()});$(".gallery img").unbind("click touch").bind("click touch",function(){$("html").scrollTo(this,300,{axis:"x"})})})})});this.get("/#/:lang/video/:col",function(e){n(this.params.lang);var t=this.params.col;a(e,"home");var s=Gallery.select(function(){return this.attr("id")==t}).first();$("header .btCol strong").text(s.attr("season")[lang]+" "+s.attr("year"));i(e,function(e){$("#home .gallery").width(0);r(e,"#home .gallery","/templates/vid.html",{video:"28364274"},!1,function(e){$("section#home .gallery").addClass("loaded");$("section#home").addClass("visited");$("#home #navHome a.active").removeClass("active");$("#home  #navHome a.vid_"+t).addClass("active");$("#home").removeClass("photo_content");$("#home").addClass("video_content")})})});this.get("/#/:lang/infos",function(e){n(this.params.lang);a(e,"info");s();i(e,function(e){})});this.get("/#/:lang/bio",function(e){n(this.params.lang);a(e,"bio");s();i(e,function(e){})});this.get("/#/:lang/credits",function(e){n(this.params.lang);a(e,"credit");s();i(e,function(e){})})});$.getJSON("data/gallery.json",function(t){$.each(t,function(e,t){var n=new Gallery(t);n.save()});e()})});