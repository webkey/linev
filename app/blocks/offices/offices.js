app.offices = {
  $page: $('html, body'),
  container: '.js-offices',
  balloon: '.js-offices-balloon',
  panel: '.js-offices-panel',
  slidesPerView: 5,
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
    self.runSlider();
  },
  run() {
    const self = this;

    // $(self.balloon).on('click', function (e) {
    //   e.preventDefault();
    //
    //   if (window.innerWidth <= 992) {
    //     if (!$(this).is(':animated')) {
    //       self.$page.stop().animate({
    //         scrollTop: $(self.currentId).offset().top - $('header').innerHeight() - 20,
    //       }, 300);
    //     }
    //   }
    // });

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
  runSlider() {
    const self = this;
    const $slider = $('.js-offices-info-slider');

    if ($slider.length) {
      const $prevEl = $slider.find('.js-offices-info-slider__button_prev');
      const $nextEl = $slider.find('.js-offices-info-slider__button_next');

      const sliderInstance = new Swiper($slider.find('.swiper-container'), {
        init: false,
        // loop: true, // not work correctly along with "watchOverflow: true"
        freeMode: true,
        slidesPerView: self.slidesPerView,
        slidesPerGroup: self.slidesPerView,
        spaceBetween: 0,
        watchSlidesVisibility: true,
        noSwipingSelector: 'label',
        watchOverflow: true,

        navigation: {
          prevEl: $prevEl,
          nextEl: $nextEl,
        },

        breakpoints: {
          1365: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          1199: {
            slidesPerView: 3.1,
            slidesPerGroup: 3,
          },
          767: {
            slidesPerView: 2.1,
            slidesPerGroup: 2,
          },
          575: {
            slidesPerView: 1.1,
            slidesPerGroup: 1,
          },
        },

        on: {
          slideChangeTransitionEnd() {
            const $img = $(sliderInstance.visibleSlides).find('.js-lazy-load');
            if ($img.filter('.loaded').length !== $img.length && app.lazyLoadGlobalInstance) {
              app.lazyLoadGlobalInstance.update();
            }
          },
        },
      });

      sliderInstance.on('init', () => {
        $slider.addClass('is-loaded');
      });

      sliderInstance.init();
    }
  },
};
