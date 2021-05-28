app.lazyLoad = {
  initEl: '.js-lazy-load',
  init() {
    app.lazyLoadGlobalInstance = new LazyLoad({
      elements_selector: this.initEl,
      threshold: 100,
    });
  },
};
