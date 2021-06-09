app.sectionCounter = {
  tabs: {
    el: '.js-section-counter-data',
    thumb: '.js-section-counter-data-thumbs a',
    panels: '.js-section-counter-data-thumbs-panels',
    panel: '.js-section-counter-data-thumbs-panels > div',
    modifiers: {
      activeClass: 'is-active',
    },
  },
  init() {
    if ($(this.tabs.el).length) {
      this.main();
    }
  },
  main() {
    const self = this;

    $(self.tabs.el).msTabs({
      anchor: self.tabs.thumb,
      panels: self.tabs.panels,
      panel: self.tabs.panel,
      collapsible: false,
      setHash: false,
      activeIndex: 0,
      modifiers: {
        activeClass: self.tabs.modifiers.activeClass,
      },
    });
  },
};
