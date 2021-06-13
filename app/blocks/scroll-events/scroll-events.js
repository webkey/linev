app.scrollEvents = {
  header: '.header',
  init() {
    const self = this;
    const $WINDOW = $(window);
    const $HTML = $('html');

    let position = $WINDOW.scrollTop();

    $WINDOW.scroll(function () {
      if ($(this).scrollTop() > $(self.header).innerHeight()) {
        $HTML.addClass('scrolled');
      } else {
        $HTML.removeClass('scrolled');
      }

      if ($(this).scrollTop() <= $(self.header).innerHeight()) {
        $HTML.addClass('unscrolled');
      } else {
        $HTML.removeClass('unscrolled');
      }

      const scroll = $WINDOW.scrollTop();

      if (scroll > position) {
        $HTML.addClass('scrolldown').removeClass('scrollup');
      } else {
        $HTML.addClass('scrollup').removeClass('scrolldown');
      }

      position = scroll;
    });
  },
};
