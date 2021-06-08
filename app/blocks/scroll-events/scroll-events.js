app.scrollEvents = {
  header: '.header',
  headerMenu: '.header-menu',
  init() {
    const self = this;
    const $WINDOW = $(window);
    const $HTML = $('html');
    const $header = $(self.header);
    const $headerMenu = $(self.headerMenu);

    let position = $WINDOW.scrollTop();

    $WINDOW.scroll(function () {
      if ($(this).scrollTop() > $(self.header).innerHeight()) {
        $HTML.addClass('scrolled');
      } else {
        $HTML.removeClass('scrolled');
      }

      const scroll = $WINDOW.scrollTop();

      if (scroll > position) {
        $HTML.addClass('scrolldown').removeClass('scrollup');
        $header.add($headerMenu).addClass('is-collapsed').removeClass('is-expanded');
      } else {
        $HTML.addClass('scrollup').removeClass('scrolldown');
        $header.add($headerMenu).addClass('is-expanded').removeClass('is-collapsed');
      }

      position = scroll;
    });
  },
};
