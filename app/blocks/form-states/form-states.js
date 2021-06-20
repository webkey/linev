app.formStates = {
  element: '.js-form-states',
  init() {
    if ($(this.element).length) {
      this.focused();
      this.filled();
      this.disabled();
    }
  },
  toggleStateClass(mod, cond) {
    const $this = $(this);
    $this.add($this.parent()).add($this.parent().prev()).add($this.parent().prev().find('label')).add($this.closest('.contacts-steps__input'))
      .toggleClass(mod, cond);
  },
  focused() {
    const self = this;

    $(self.element).on('focus blur', function (e) {
      self.toggleStateClass.call(this, 'is-focused', e.handleObj.origType === 'focus');
    });
  },
  filled() {
    const self = this;

    $.each($(self.element), function () {
      self.toggleStateClass.call(this, 'is-filled', $(this).val().length !== 0);
    });

    $(self.element).on('keyup change', function () {
      self.toggleStateClass.call(this, 'is-filled', $(this).val().length !== 0);
    });
  },
  disabled() {
    const self = this;

    $.each($(self.element), function () {
      self.toggleStateClass.call(this, 'is-disabled', $(this).is(':disabled'));
    });
  },
};
