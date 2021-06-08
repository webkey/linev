app.scrollEvents = {
  init() {
    const $WINDOW = $(window);
    const $HTML = $('html');

    let position = $WINDOW.scrollTop();

    $WINDOW.scroll(function () {
      if ($(this).scrollTop() > $('.header').innerHeight()) {
        $HTML.addClass('scrolled');
      } else {
        $HTML.removeClass('scrolled');
      }

      const scroll = $WINDOW.scrollTop();

      if (scroll > position) {
        $HTML.addClass('scrolldown');
        $HTML.removeClass('scrollup');
      } else {
        $HTML.addClass('scrollup');
        $HTML.removeClass('scrolldown');
      }

      position = scroll;
    });
  },
};
