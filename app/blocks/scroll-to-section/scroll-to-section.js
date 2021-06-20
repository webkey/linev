app.scrollToSection = {
  anchor: '.js-scroll-to',
  init() {
    if ($(this.anchor).length) {
      this.scrollTo();
    }
  },
  scrollTo() {
    $(this.anchor).on('click', function (e) {
      e.preventDefault();

      const $this = $(this);
      const id = $this.attr('href');

      if ($(id).length) {
        const $html = $('html, body');
        if (!$html.is(':animated')) {
          $html.stop().animate({
            scrollTop: $(id).offset().top - $('.header').innerHeight(),
          }, 300);
        }
      }
    });
  },
};
