<script>
    $('.scrollIn').click(function(e){
        e.preventDefault();
        var target= $(this).attr('href');
        var targetPos= $(target).offset().top;
        $('html, body').animate({scrollTop: targetPos-50}, 1000);
    });
    $(window).scroll(function(e){
        //使用者移動多少距離
        var scrollPos= $(window).scrollTop();
        //畫面高度
        var windowHeight= $(window).height();

        $('.animate').each(function(){
            var thisPos= $(this).offset().top;
            if((windowHeight + scrollPos -50) >= thisPos){
                $(this).addClass('fadeIn');
            }
        })
    })       
</script>