app.global = {
  control: '.js-global-balloon-open',
  panel: '.js-global-balloon-popup',
  container: '.js-global-balloon',
  init() {
    const self = this;
    const $control = $(self.control);
    if ($control.length) {
      $.each($control, function () {
        self.run($(this), $(this).closest(self.container));
      });
      self.hoverEvent();
    }
    self.runSlider();
  },
  run($el, $container) {
    const self = this;
    $el.switchClass({
      // removeExisting() {
      //   return window.innerWidth >= 992;
      // },
      removeExisting: true,
      preventRemoveClass: 'js-global-balloon-prevent-hide',
      switchClassTo: $(self.panel, $container).add($container).add($container.parent()),
      modifiers: {
        activeClass: 'is-open',
      },
    });
  },
  hoverEvent() {
    const self = this;

    $(self.control).on('mouseenter', function () {
      if (window.innerWidth > 768) {
        $(this).switchClass('add');
      }
    });
  },
  runSlider() {
    const self = this;
    const $slider = $('.js-global-info-slider');

    if ($slider.length) {
      const $prevEl = $slider.find('.js-global-info-slider__button_prev');
      const $nextEl = $slider.find('.js-global-info-slider__button_next');

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
