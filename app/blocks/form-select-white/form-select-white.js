app.formSelectWhite = {
  initElement: '.js-form-select-white',
  init(selector) {
    const el = document.querySelectorAll(selector || this.initElement);
    if (el.length) {
      this.run(el);
    }
  },
  run(el) {
    for (let i = 0; i < el.length; i++) {
      const curEl = el[i];
      const dataSearch = curEl.getAttribute('data-search');
      const showSearch = dataSearch === null || dataSearch === 'false' ? Infinity : 0;
      $(curEl).select2({
        theme: 'custom',
        language: 'en',
        width: '100%',
        minimumResultsForSearch: showSearch,
        selectionCssClass: 'form-select-white__selection',
        dropdownCssClass: 'form-select-white__dropdown',
      });
    }
  },
};
