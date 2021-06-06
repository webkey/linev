app.powerful = {
  tabs: {
    el: '.js-powerful-data',
    thumb: '.js-powerful-data-thumbs a',
    panels: '.js-powerful-data-thumbs-panels',
    panel: '.js-powerful-data-thumbs-panels > div',
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
