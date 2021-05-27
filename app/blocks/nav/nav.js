app.nav = {
  navElement: '.js-nav',
  init() {
    const $nav = $(this.navElement);
    if ($nav.length) {
      $nav.nav({
        // Elements
        item: '.js-nav-li',
        drop: '.js-nav-drop',
        arrow: '.js-nav-arrow',
        // Additional settings
        arrowEnable: true,
        submenuPosition: false,
      });
    }
  },
};
