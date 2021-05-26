app.lang = {
  controlElement: '.js-lang-control',
  dropElement: '.js-lang-drop',
  init() {
    if ($(this.controlElement).length) {
      this.run();
      this.hover();
    }
  },
  run() {
    const self = this;
    $(self.controlElement).switchClass({
      removeExisting() {
        return window.innerWidth >= 992; // todo Удалить, если не будет нужно на мобиле
      },
      switchClassTo: $(self.dropElement),
      modifiers: {
        activeClass: 'drop-is-open',
      },
    });
  },
  hover() {
    const self = this;
    const $item = $(self.dropElement).find('a');
    $item.on('mouseenter', function () {
      $item.addClass('muted');
      $(this).removeClass('muted');
    }).on('mouseleave', () => {
      $item.removeClass('muted');
    });
  },
};
