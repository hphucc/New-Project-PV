    document.addEventListener('DOMContentLoaded', function() {
        run();
    });

    function run() {
          var slider = document.querySelector('.js-carousel');
          lory(slider, {
          infinite: 4,
          enableMouseEvents: true,
          classNameFrame: 'js-carousel__frame',
          classNameSlideContainer: 'js-carousel__slides',
          classNamePrevCtrl: 'js-carousel__prev',
          classNameNextCtrl: 'js-carousel__next',      
          });
    }