function cookiePolicyPopup() {
    let cookie_el = $('.cookie-policy-popup'),
        cookie_close_el = $('.cookie-policy-popup .cookie-policy-close');
    if (typeof Cookies.get('COOKIE_POLICY') === 'undefined') {
        Cookies.set('COOKIE_POLICY', 'true', {
            expires: 30,
        });
        setTimeout(() => {
            cookie_el.addClass('show-popup');
        }, 1500);
        $(cookie_close_el).click(function (e) {
            e.preventDefault();
            cookie_el.removeClass('show-popup');
            setTimeout(() => {
                cookie_el.remove();
            }, 1000);

        });
    }
}

(function ($) {
    cookiePolicyPopup();
})(window.jQuery);