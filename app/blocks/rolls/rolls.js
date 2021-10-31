app.rolls = {
  el: '.js-rolls',
  item: '.js-rolls-item',
  header: '.js-rolls-header',
  switcher: '.js-rolls-switcher',
  panel: '.js-rolls-panel',
  modifiers: {
    activeClass: 'is-active',
  },
  animationSpeed: 300,
  init() {
    const self = this;
    const $el = $(self.el);
    if ($el.length) {
      const instance = $el.msRolls({
        item: self.item,
        header: self.header,
        switcher: self.switcher,
        panel: self.panel,
        modifiers: {
          activeClass: self.modifiers.activeClass,
        },
      });
      instance.msRolls('open', $('.js-auto-open'));
    }
  },
};
