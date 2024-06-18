jQuery(function ($) {

    'use strict';

    // --------------------------------------------------------------------
    // PreLoader
    // --------------------------------------------------------------------

    (function () {
        $('#preloader').delay(200).fadeOut('slow');
    }());



    // --------------------------------------------------------------------
    // Sticky Sidebar
    // --------------------------------------------------------------------

    $('.left-col-block, .right-col-block').theiaStickySidebar();

    // --------------------------------------------------------------------
    // For Mobile Titles
    // --------------------------------------------------------------------
    
    $("[title]").click(function(e) {
        if ($(document).width() <= 768 && !$(this).hasClass('toggle-dark-mode')) {
            $(".title-tooltip").remove();
            let titleWidth = $(this).attr("title").length * 7.1;
            $(this).append(
                '<span class="title-tooltip">' + $(this).attr("title") + "</span>"
            );
        }
    });

    // $(".meter > span").each(function() {
    //     $(this)
    //         .data("origWidth", $(this).width())
    //         .width(0)
    //         .animate({
    //             width: $(this).data("origWidth")
    //         }, 3000);
    // });
    
    var $extensionItemElem = $('.row.extension-items .extension-item-container a.extension-item');

    $extensionItemElem.click(function(evt) {
        evt.preventDefault();
        $('#supportMeModal').modal('show');
        var urlToRedirect = $(this).attr('href');

        $(".meter > span").data("origWidth", $(".meter > span").width())
            .width(0)
            .animate({
                width: $('body').width()//$(".meter > span").data("origWidth")
            }, 7000);
            console.log('test', $(this).attr('href'));

        setTimeout(function() {
            window.location.href = urlToRedirect
        }, 7000);
    });

    $(document).click(function(evt) {
        var target = evt.target.className;
        if(!(evt.target.hasAttribute('title') || (typeof $(evt.target).closest('[title]').attr('title') != 'undefined' && $(evt.target).closest('[title]').attr('title').length))) {
            $(".title-tooltip").remove();
        }
    });

    function amountscrolled(){
        var winheight = $(window).height()
        var docheight = $(document).height()
        var scrollTop = $(window).scrollTop()
        var trackLength = docheight - winheight
        var pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 NaN if tracklength == 0)
        // console.log(pctScrolled + '% scrolled')
        return pctScrolled;
    }
     
    $(window).on("scroll", function(){
        var scrolledPct = amountscrolled();
        if (scrolledPct <= 25) {
            $('.bottom-fixed').removeClass('active');
            $('.hire-me-sticky').removeClass('hide-sticky');
            $('body').addClass('show-sticky-hire-btn');
        } else {
            var keepClosedToken = _accessCookie('keepclosed');
            if (!keepClosedToken) {
                $('.bottom-fixed').addClass('active');
                $('.hire-me-sticky').addClass('hide-sticky');
                $('body').removeClass('show-sticky-hire-btn');
            }
        }
    });

    function _createCookie(cookieName, value, minutes) {
        if (minutes) {
            var date = new Date();
            date.setTime(date.getTime()+(minutes*60*1000));
            var expires = "; expires = "+date.toGMTString();
        } else {
            var expires = "";
        }
        document.cookie = cookieName+"="+value+expires+"; path=/";
    }

    function _accessCookie(cookieName) {
        var name = cookieName + '=';
        var allCookieArray = document.cookie.split(';');

        for(var i=0; i<allCookieArray.length; i++)
        {
            var temp = allCookieArray[i].trim();
            if (temp.indexOf(name)==0)
            return temp.substring(name.length,temp.length);
        }
        return '';
    }

    function _deleteCookie(cookieName) {
        document.cookie = cookieName + '=; expires = Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    }

    $(".bottom-fixed .close-btn, .bottom-fixed .close-link").click(function(e) {
        e.preventDefault();
        $('.bottom-fixed').removeClass('active');
        $('.hire-me-sticky').removeClass('hide-sticky');
        $('body').addClass('show-sticky-hire-btn');
        _createCookie('keepclosed', 'yes', 2);
    });
}); // JQuery end
