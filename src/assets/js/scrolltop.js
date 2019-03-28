$(document).ready(function(){

        $('.menu_icon').on("click", function(){
            $('.left_content').toggleClass('toggle');
        });

        $(window).on("scroll", function() {
            if($(window).scrollTop()) {
                $('.left_content').removeClass('toggle');
            }
            else {
                $('.left_content').removeClass('toggle');
            }
        })
    

    // ------------------------------------ SCROLLING EFFECT
    // SCROLL 
    $(window).scroll(function(){
        if($(this).scrollTop() > 550){
            $('#scrollToTopButon').fadeIn();
            $('.menu_icon').addClass('showing');
            $('.head_top').css({'padding':'4px 0px'});
            $('.logo_head').addClass('logo_head_scroll');
        
        }
        else{
            $('#scrollToTopButon').fadeOut();
            $('.menu_icon').removeClass('showing');
            $('.head_top').css({'padding':'20px 0px'});
            $('.logo_head').removeClass('logo_head_scroll');
        }
    });

    // SCROLL TO TOP BUTTON
    $('#scrollToTopButon').click(function(){
        $('html,body').animate({scrollTop : 0},400);
    });
});