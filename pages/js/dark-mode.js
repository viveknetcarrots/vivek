_createCookie = function(cookieName, value, minutes) {
    if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + minutes * 60 * 1000);
        var expires = "; expires = " + date.toGMTString();
    } else {
        var expires = "";
    }

    document.cookie = cookieName + "=" + value + expires + "; path=/";
};

_accessCookie = function(cookieName) {
    var name = cookieName + '=';
    var allCookieArray = document.cookie.split(';');

    for (var i = 0; i < allCookieArray.length; i++) {
        var temp = allCookieArray[i].trim();
        if (temp.indexOf(name) == 0) return temp.substring(name.length, temp.length);
    }

    return '';
};

_deleteCookie = function(cookieName) {
    document.cookie = cookieName + '=; expires = Thu, 01 Jan 1970 00:00:01 GMT; path=/';
};

var darkModeEnabled = _accessCookie('darkModeEnabled') == "1" ? true : false;
var toggleBtnDefaultText = 'Enable Dark Mode';
var toggleBtnDarkEnabledText = 'Enable DayLight Mode';
if (_accessCookie('darkModeEnabled')) {
    if (darkModeEnabled) {
        document.getElementById('page-top').classList.add('dark-mode');
        document.querySelector('meta[property="theme-color"]').setAttribute('content', '#212230');
        document.getElementById('toggleDarkMode').title = toggleBtnDarkEnabledText;
    }
} else {
    /* 
        check if system has dark mode enabled
    */
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        darkModeEnabled = true;
        document.getElementById('page-top').classList.add('dark-mode');
        document.querySelector('meta[property="theme-color"]').setAttribute('content', '#212230');
        document.getElementById('toggleDarkMode').title = toggleBtnDarkEnabledText;
    }
}

jQuery(function($) {

    'use strict';
    // --------------------------------------------------------------------
    // For Dark mode toggle
    // --------------------------------------------------------------------

    $("#toggleDarkMode").click(function(e) {
        $('body').toggleClass('dark-mode');
        if (darkModeEnabled) {
            darkModeEnabled = false;
            _createCookie('darkModeEnabled', '0', 43200);
            $('#toggleDarkMode').attr('title', toggleBtnDefaultText);
        } else {
            darkModeEnabled = true;
            _createCookie('darkModeEnabled', '1', 43200);
            $('#toggleDarkMode').attr('title', toggleBtnDarkEnabledText);
        }
    });
}); // JQuery end