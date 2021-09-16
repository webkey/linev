app.showMore = {
  initEl: '.js-show-more',
  buttonEl: '.js-show-more-btn',
  fullEl: '.js-show-more-full',
  dotsEl: '.js-show-more-dots',
  init() {
    if ($(this.initEl).length) {
      this.run();
    }
  },
  run() {
    const self = this;
    $(self.buttonEl).on('click', function (e) {
      e.preventDefault();
      $(this).hide();
      const $thisContainer = $(this).closest(self.initEl);

      $thisContainer.find(self.dotsEl).hide();
      $thisContainer.find(self.fullEl).show();
    });
  },
};
