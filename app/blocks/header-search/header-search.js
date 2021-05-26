app.headerSearch = {
  controlElement: '.js-header-search-control',
  closeElement: '.js-header-search-close',
  panelElement: '.js-header-search-panel',
  inputElement: '.js-header-search-input',
  init() {
    if ($(this.controlElement).length) {
      this.run();
    }
  },
  run() {
    const self = this;
    const $input = $(self.inputElement);
    $(self.controlElement).switchClass({
      removeExisting: true,
      switchClassTo: $(self.panelElement).add('.header-common'),
      removeEl: $(self.closeElement),
      preventRemoveClass: 'js-header-search-prevent-hide',
      modifiers: {
        activeClass: 'is-open',
      },
      afterAdd() {
        setTimeout(() => {
          $input.focus();
        }, 50);
      },
      afterRemove() {
        setTimeout(() => {
          $input.blur();
        }, 50);
      },
    });
  },
};
