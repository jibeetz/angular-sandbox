app.directive('sliderInit', ['$timeout', function($timeout) {
    return {
        link: function(scope, element, attrs){
            $timeout(function(){
                $('.slider').slick({
                    dots: true,
                    adaptiveHeight: true,
                    /*autoplay: true,
                    autoplaySpeed: 7000,*/
                    responsive: [{
                        breakpoint: 768,
                        settings: {
                            arrows: false
                        }
                    }]
                });
            }, 100);
        }
    };
}]);