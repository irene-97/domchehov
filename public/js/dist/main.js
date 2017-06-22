(function () {
'use strict';

$(function () {
    $(".fancybox").each(function () {
        var $this = $(this);

        $this.fancybox({
            openEffect: 'none',
            closeEffect: 'none',
            wrapCSS: $this.data('fancybox-wrap-css') || ''
        });
    });
});

$(function () {
    $('.product-content .previews a').on('click', function () {
        var $this = $(this);

        $this.addClass('active').siblings().removeClass('active').closest('.previews').siblings('.big-photo').children('a').eq($this.index()).addClass('active').siblings().removeClass('active');

        return false;
    });
});

var mobileMenu = {
    api: function api(id, callback) {
        var mmenu = $(id).data('mmenu');

        if (mmenu && $.isFunction(callback)) {
            callback(mmenu);
        }
    },
    open: function open(id) {
        this.api(id, function (mmenu) {
            mmenu.open();
        });
    },
    close: function close(id) {
        this.api(id, function (mmenu) {
            mmenu.close();
        });
    },
    toggle: function toggle(id) {
        this.api(id, function (mmenu) {
            if ($(document.html).hasClass('mm-opening')) {
                mmenu.close();
            } else {
                mmenu.open();
            }
        });
    }
};

$(function () {
    $('.mobile-menu').each(function () {
        var $this = $(this);

        $this.mmenu({
            extensions: ['border-full', 'multiline', 'pagedim-black'],
            navbar: {
                title: $this.data('mmenu-navbar-title') || 'Меню'
            }
        }, {
            pageSelector: '#root'
        });
    });
});

$(function () {
    var $mobileSidebar = $('.mobile-sidebar');

    $mobileSidebar.find('.toggle-catalog').on('click', function () {
        mobileMenu.toggle('#mobile-menu-catalog');

        return false;
    });

    $mobileSidebar.find('.toggle-menu').on('click', function () {
        mobileMenu.toggle('#mobile-menu-main');

        return false;
    });
});

}());
//# sourceMappingURL=main.js.map
