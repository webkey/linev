app.lang = {
  control: '.js-lang-control',
  panel: '.js-lang-panel',
  init() {
    if ($(this.control).length) {
      this.run();
      this.hover();
    }
  },
  run() {
    const self = this;
    $(self.control).switchClass({
      // removeExisting() {
      //   return window.innerWidth >= 992;
      // },
      removeExisting: true,
      preventRemoveClass: 'js-lang-prevent-hide',
      switchClassTo: $(self.panel),
      modifiers: {
        activeClass: 'is-open',
      },
    });
  },
  hover() {
    const self = this;
    const $item = $(self.panel).find('a');
    $item.on('mouseenter', function () {
      $item.addClass('muted');
      $(this).removeClass('muted');
    }).on('mouseleave', () => {
      $item.removeClass('muted');
    });
  },
};
