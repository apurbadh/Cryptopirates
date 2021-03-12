function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
/* for preview end */
"use strict";

// Add Slider functionality to the top of home page in #top-content section.
var mainSlider = $("#main-slider","#top-content");
mainSlider.slick({
    dots: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
});
// Adding animation to the #main-slider
mainSlider.on('afterChange', function(event, slick, currentSlide, nextSlide){
    $('.slide > div:nth-child(1)','#main-slider').removeClass("animated");
    $('.slide > div:nth-child(2)','#main-slider').removeClass("animated animation-delay1");
 
    $('.slick-active > div:nth-child(1)','#main-slider').addClass("animated");
    $('.slick-active > div:nth-child(2)','#main-slider').addClass("animated animation-delay1");
});
// Add Slider functionality to the #testimonials section in the home page.
var testimonialsSlider = $("#testimonials-slider","#testimonials");
testimonialsSlider.slick({
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1
});
// Add Slider functionality to the testimonials in the "Sign in" and "Sign out" pages.
var miniTestimonialsSlider = $(".mini-testimonials-slider","#form-section");
miniTestimonialsSlider.slick({
    dots: true,
    arrows: false,
    infinite: false,
    autoplay: true,
    speed: 200
});
// Add Slider functionality to the info-slider in the about page.
var infoSlider = $(".info-slider","#page-head");
infoSlider.slick({
    dots: true,
    arrows: false,
    infinite: false,
    autoplay: true,
    speed: 200
});
$(window).on("load", function() {
    // Adding animation to the #main-slider
    $('.slick-active > div:nth-child(1)','#main-slider').addClass("animated");
    $('.slick-active > div:nth-child(2)','#main-slider').addClass("animated animation-delay1");
    // Counter slider functions in "CUSTOM HOSTING PLAN" section on the homepage
    var cPlan = $('#c-plan');
    cPlan.slider({
        tooltip: 'always'
    });
    cPlan.on("slide", function(e) {
        $('.slider .tooltip-up','#custom-plan').text(e.value/20);
    });
    cPlan.value = cPlan.data("slider-value");
    $('.slider .tooltip','#custom-plan').append('<div class="tooltip-up"></div>');
    $('.slider .tooltip-up','#custom-plan').text(cPlan.value/20);
    $('.slider .tooltip-inner','#custom-plan').attr("data-unit",cPlan.data("unit"));
    $('.slider .tooltip-up','#custom-plan').attr("data-currency",cPlan.data("currency"));
    
    // Features Section click function
    var featureIconHolder = $(".feature-icon-holder", "#features-links-holder");
    
    featureIconHolder.on("click",function(){
        featureIconHolder.removeClass("opened");
        $(this).addClass("opened");
        $(".show-details","#features-holder").removeClass("show-details");
        $(".feature-d"+$(this).data("id"), "#features-holder").addClass("show-details");
    });
    
    // Fix #features-holder height in features section
    var featuresHolder = $("#features-holder");
    var featuresLinksHolder = $("#features-links-holder");
    var featureBox = $(".show-details","#features-holder");
    
    featuresHolder.css("height",featureBox.height()+120);
    featuresLinksHolder.css("height",featureBox.height()+120);

    // Fix #features-holder height in features section
    $(window).on("resize",function() {
        featuresHolder.css("height",featureBox.height()+120);
        featuresLinksHolder.css("height",featureBox.height()+120);
        return false;
    });
    
    // Apps Section hover function
    var appHolder = $(".app-icon-holder", "#apps");
    
    appHolder.on("mouseover",function(){
        appHolder.removeClass("opened");
        $(this).addClass("opened");
        $(".show-details", "#apps").removeClass("show-details");
        $(".app-details"+$(this).data("id"), "#apps").addClass("show-details");
    });
    
    // More Info Section hover function
    var infoLink = $(".info-link", "#more-info");
    
    infoLink.on("mouseover",function(){
        infoLink.removeClass("opened");
        $(this).addClass("opened");
        $(".show-details", "#more-info").removeClass("show-details");
        $(".info-d"+$(this).data("id"), "#more-info").addClass("show-details");
    });
    
    // Servers Marker Location in our servers page
    var locationsList = [["California",97,48,"r"],["Costa Rika",212,31,"l"],["Vancouver",136,161,"r"],["Brazil",303,233,"r"],["Alexandria",149,349,"l"],["Dubai",174,469,"l"],["Delhi",204,605,"r"],["Munech",91,417,"r"],["Barcelona",112,279,"l"],["Moscow",41,554,"r"],["Hong Kong",151,663,"r"],["Melborne",356,688,"l"],["Pulau Ujong",265,578,"l"]];
    
    var serversLocationHolder = $('.servers-location-holder','#serversmap.st');
    for(var i=0;i<=locationsList.length-1;i++){
        var sMarkerDir = locationsList[i][3];
        var leftText = "";
        var rightText = "";
        if(sMarkerDir=="r"){
            leftText = "";
            rightText = locationsList[i][0];
        }else if(sMarkerDir=="l"){
            leftText = locationsList[i][0];
            rightText = "";
        }
        serversLocationHolder.append('<div class="server-marker" style="top:'+locationsList[i][1]+'px;left:'+locationsList[i][2]+'px;"><span class="left-text">'+leftText+'</span><span class="marker-icon"></span><span class="right-text">'+rightText+'</span></div>');
    }
    
});
function copyToClipboard(e){var a=$("<input>");$("body").append(a),a.val($(e).text()).select(),document.execCommand("copy"),a.remove(),$("#copied").removeClass("hide"),setTimeout(function(){$("#copied").addClass("hide")},4e3)}$("#type").change(function(){var e=$("#type").val();$("#amount").val(""),$("#amount").attr("placeholder","Deposit amount in "+e),$("#wallet").attr("placeholder","Your "+e+" wallet address")}),$(document).ready(function(){$("#formdeposit").submit(function(){return $("#result").html("<b>Loading...</b>"),$("#invest-form-loader").removeClass("hide"),$.ajax({type:"POST",url:"ajax/new_deposit.php",data:$(this).serialize()}).done(function(e){$("#invest-form-loader").addClass("hide"),$("#result").removeClass("hide"),$("#result").html(e),$("#wallet").val("")}).fail(function(){$("#result").removeClass("hide"),$("#result").html("<strong>Failed.</strong> Try again later.")}),!1}),$("#formreferral").submit(function(){return $("#result").html("<b>Loading...</b>"),$("#invest-form-loader").removeClass("hide"),$.ajax({type:"POST",url:"ajax/new_referral.php",data:$(this).serialize()}).done(function(e){$("#invest-form-loader").addClass("hide"),$("#result").removeClass("hide"),$("#result").html(e),$("#wallet").val("")}).fail(function(){$("#result").removeClass("hide"),$("#result").html("<strong>Failed.</strong> Try again later.")}),!1}),$("#formcontact").submit(function(){return $("#result").html("<b>Sending...</b>"),$("#invest-form-loader").removeClass("hide"),$.ajax({type:"POST",url:"ajax/new_contact.php",data:$(this).serialize()}).done(function(e){$("#invest-form-loader").addClass("hide"),$("#result").removeClass("hide"),$("#result").html(e),$("#name").val(""),$("#email").val(""),$("#message").val("")}).fail(function(){$("#result").removeClass("hide"),$("#result").html("<strong>Failed.</strong> Try again later.")}),!1}),$("a#clearall").click(function(){return $("#result").html("<b>Loading...</b>"),$("#invest-form-loader").removeClass("hide"),$.ajax({type:"GET",url:"ajax/clear_referral.php",data:""}).done(function(e){$("#invest-form-loader").addClass("hide"),$("#result").removeClass("hide"),$("#result").html(e),$("#wallet").val("")}).fail(function(){$("#result").removeClass("hide"),$("#result").html("<strong>Failed.</strong> Try again later.")}),!1}),$("a#refreshhit").click(function(){return $("#hits").html("<b>Refreshing...</b>"),$.ajax({type:"GET",url:"ajax/refresh_hits.php",data:""}).done(function(e){$("#hits").html(e)}).fail(function(){$("#hits").html("<strong>Failed.</strong> Try again later.")}),!1})});