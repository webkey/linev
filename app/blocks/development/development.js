app.development = {
  container: '.js-chart-balloon',
  control: '.js-chart-balloon-open',
  panel: '.js-chart-balloon-popup',
  init() {
    const self = this;
    const $control = $(self.control);
    if ($control.length && window.innerWidth > 768) {
      $.each($control, function () {
        self.run($(this), $(this).closest(self.container));
      });
    }
    self.addOnHover();
  },
  run($el, $container) {
    const self = this;
    $el.switchClass({
      // removeExisting() {
      //   return window.innerWidth >= 992;
      // },
      removeExisting: true,
      preventRemoveClass: 'js-chart-balloon-prevent-hide',
      switchClassTo: $(self.panel, $container).add($container).add($container.parent()),
      modifiers: {
        activeClass: 'is-open',
      },
    });
  },
  addOnHover() {
    const self = this;

    $(self.control).on('mouseenter', function () {
      if (window.innerWidth > 768) {
        $(this).switchClass('add');
      }
    });
  },
};
