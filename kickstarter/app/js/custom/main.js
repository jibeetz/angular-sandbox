// Columns height alignment

var currentTallest = 0;
var currentRowStart = 0;
var rowDivs = [];

function getOriginalHeight(el) {
    return el.find('.article').outerHeight();
}

function setHeight(rowDivs, currentTallest){
    if(rowDivs.length > 1){

        var areAllArticlesImages = true;
        for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++){
            if(rowDivs[currentDiv].find('.article:not(.article-type-image)').length !== 0)
                areAllArticlesImages = false;
        }

        if(!areAllArticlesImages)
            for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++){
                rowDivs[currentDiv].find('.article').outerHeight(currentTallest);
            }
    }
}

var columnConform = function (resize) {

    if(resize)
        $('.article').each(function(index) {
            $(this).height('auto');
        });

    // find the tallest DIV in the row, and set the heights of all of the DIVs to match it.
    $('.article-container').each(function(index) {

        if(currentRowStart != $(this).position().top) {

            // we just came to a new row.  Set all the heights on the completed row
            setHeight(rowDivs, currentTallest);

            // set the variables for the new row
            rowDivs.length = 0; // empty the array
            currentRowStart = $(this).position().top;
            currentTallest = getOriginalHeight($(this));
            rowDivs.push($(this));

        } else {

            // another div on the current row. Add it to the list and check if it's taller
            rowDivs.push($(this));
            currentTallest = (currentTallest < getOriginalHeight($(this))) ? (getOriginalHeight($(this))) : (currentTallest);

        }
        // do the last row
        setHeight(rowDivs, currentTallest);
    });
};

$(function(){

    $('a.anchor-link[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            var navbarHeight = $('.navbar-default').height();
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - navbarHeight
                }, 1000);
                return false;
            }
        }
    });
});


$(window).resize(function() {
    columnConform(true);
});

function isSecure() {
    return window.location.protocol == 'https:';
}