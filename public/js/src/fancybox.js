$(() => {
    $(".fancybox").each(function () {
        let $this = $(this);

        $this.fancybox({
            openEffect: 'none',
            closeEffect: 'none',
            wrapCSS: $this.data('fancybox-wrap-css') || '',
        });
    });
});