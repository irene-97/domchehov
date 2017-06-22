let mobileMenu = {
    api: function (id, callback) {
        let mmenu = $(id).data('mmenu');

        if (mmenu && $.isFunction(callback)) {
            callback(mmenu);
        }
    },
    open: function (id) {
        this.api(id, mmenu => {
            mmenu.open();
        });
    },
    close: function (id) {
        this.api(id, mmenu => {
            mmenu.close();
        });
    },
    toggle: function (id) {
        this.api(id, mmenu => {
            if ($(document.html).hasClass('mm-opening')) {
                mmenu.close();
            } else {
                mmenu.open();
            }
        });
    }
};

$(() => {
    $('.mobile-menu').each(function () {
        let $this = $(this);

        $this.mmenu({
            extensions: [
                'border-full',
                'multiline',
                'pagedim-black'
            ],
            navbar: {
                title: $this.data('mmenu-navbar-title') || 'Меню'
            }
        }, {
            pageSelector: '#root'
        });
    });
});

export default mobileMenu;