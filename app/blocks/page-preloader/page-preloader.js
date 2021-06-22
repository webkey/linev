app.pagePreloader = {
  element: '.js-page-preloader',
  init() {
    const $element = $(this.element);
    if ($element.length) {
      $(window).on('load', () => {
        $('html').addClass('page-loaded');
        $element.addClass('page-preloader-hide');
        setTimeout(() => {
          $element.remove();
        }, 2000);
      });
    }
  },
};
