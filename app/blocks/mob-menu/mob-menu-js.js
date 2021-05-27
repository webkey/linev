app.mobMenu = {
  controlElement: '.js-mob-menu-control',
  init() {
    const $controlElement = $(this.controlElement);
    const $html = $('html');
    if ($controlElement.length) {
      $controlElement.switchClass({
        removeExisting: true,
        switchClassTo: $('.js-mob-menu').add('.js-mob-menu-overlay'),
        removeEl: $('.js-mob-menu-close').add('.js-mob-menu-overlay'),
        cssScrollFixed: true,
        preventRemoveClass: 'js-mob-menu-prevent-hide',
        modifiers: {
          activeClass: 'mob-menu-is-open',
        },
        afterAdd() {
          $html.addClass('open-only-mob');
          fullpage_api.setAllowScrolling(false);
        },
        afterRemove() {
          $html.removeClass('open-only-mob');
          fullpage_api.setAllowScrolling(true);
        },
      });
    }
  },
};
