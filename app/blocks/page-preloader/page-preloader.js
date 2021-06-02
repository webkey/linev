app.pagePreloader = {
  el: '.js-page-preloader',
  init() {
    const $el = $(this.el);
    if ($el.length) {
      $(window).on('load', () => {
        $('html').addClass('page-loaded');
        $el.addClass('page-preloader-hide');
        setTimeout(() => {
          $el.remove();
        }, 2000);
      });
    }
  },
};
