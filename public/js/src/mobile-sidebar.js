import mobileMenu from './mobile-menu';

$(() => {
    let $mobileSidebar = $('.mobile-sidebar');

    $mobileSidebar.find('.toggle-catalog').on('click', function () {
        mobileMenu.toggle('#mobile-menu-catalog');

        return false;
    });

    $mobileSidebar.find('.toggle-menu').on('click', function () {
        mobileMenu.toggle('#mobile-menu-main');

        return false;
    });
});