app.powerful = {
  el: '.js-powerful-data',
  thumb: '.js-powerful-data-thumbs a',
  panels: '.js-powerful-data-thumbs-panels',
  panel: '.js-powerful-data-thumbs-panels > div',
  modifiers: {
    activeClass: 'is-active',
  },
  init() {
    const $el = $(this.el);

    if ($el.length) {
      const self = this;

      $el.msTabs({
        anchor: self.thumb,
        panels: self.panels,
        panel: self.panel,
        collapsible: false,
        setHash: false,
        activeIndex: 0,
        modifiers: {
          activeClass: self.modifiers.activeClass,
        },
      });
    }
  },
};
