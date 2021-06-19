app.offices = {
  $page: $('html, body'),
  container: '.js-offices',
  balloon: '.js-offices-balloon',
  panel: '.js-offices-panel',
  currentId: null,
  init() {
    const self = this;
    const $control = $(self.balloon);
    if (!self.currentId) {
      self.currentId = $($(self.balloon)[0]).attr('href');
    }
    if ($control.length) {
      self.run();
    }
  },
  run() {
    const self = this;

    $(self.balloon).on('click', function (e) {
      e.preventDefault();

      if (window.innerWidth <= 992) {
        if (!$(this).is(':animated')) {
          self.$page.stop().animate({
            scrollTop: $(self.currentId).offset().top - $('header').innerHeight() - 20,
          }, 300);
        }
      }
    });

    $(self.balloon).on('mouseenter', function () {
      self.currentId = $(this).attr('href');
      self.changeActive();
    });

    $(self.panel).on('mouseenter', function () {
      self.currentId = `#${$(this).attr('id')}`;
      self.changeActive();
    });
  },
  changeActive() {
    const self = this;
    $(self.balloon).removeClass('is-active').filter(`[href="${self.currentId}"]`).addClass('is-active');
    $(self.panel).removeClass('is-active').filter(self.currentId).addClass('is-active');
    self.changeSelect();
  },
  changeSelect() {
    app.contactsForm.chooseOption($('#contacts-office'), this.currentId.substr(1));
  },
};
