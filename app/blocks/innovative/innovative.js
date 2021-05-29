app.innovative = {
  el: '.js-innovative-data',
  item: '.js-innovative-data-item',
  header: '.js-innovative-data-header',
  switcher: '.js-innovative-data-switcher',
  panel: '.js-innovative-data-panel',
  modifiers: {
    activeClass: 'is-active',
  },
  animationSpeed: 300,
  init() {
    const self = this;
    const $el = $(self.el);
    if ($el.length) {
      $el.msRolls({
        item: self.item,
        header: self.header,
        switcher: self.switcher,
        panel: self.panel,
        modifiers: {
          activeClass: self.modifiers.activeClass,
        },
      });
    }
  },
};
