app.header = {
  el: '.js-header',
  init() {
    const self = this;
    $(window).on('load', () => {
      const $el = $(self.el);
      if ($el.length) {
        $el.addClass('after-ready');
      }
    });
  },
};
