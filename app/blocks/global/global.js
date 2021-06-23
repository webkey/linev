app.global = {
  control: '.js-global-balloon-open',
  panel: '.js-global-balloon-popup',
  container: '.js-global-balloon',
  init() {
    const self = this;
    const $control = $(self.control);
    if ($control.length) {
      $.each($control, function () {
        self.run($(this), $(this).closest(self.container));
      });
      self.hoverEvent();
    }
  },
  run($el, $container) {
    const self = this;
    $el.switchClass({
      // removeExisting() {
      //   return window.innerWidth >= 992;
      // },
      removeExisting: true,
      preventRemoveClass: 'js-global-balloon-prevent-hide',
      switchClassTo: $(self.panel, $container).add($container).add($container.parent()),
      modifiers: {
        activeClass: 'is-open',
      },
    });
  },
  hoverEvent() {
    const self = this;

    $(self.control).on('mouseenter', function () {
      if (window.innerWidth > 768) {
        $(this).switchClass('add');
      }
    });
  },
};
