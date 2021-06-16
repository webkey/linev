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
};
