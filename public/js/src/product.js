$(() => {
    $('.product-content .previews a').on('click', function () {
        let $this = $(this);

        $this
            .addClass('active')
            .siblings()
            .removeClass('active')
            .closest('.previews')
            .siblings('.big-photo')
            .children('a')
            .eq($this.index())
            .addClass('active')
            .siblings()
            .removeClass('active');

        return false;
    });
});