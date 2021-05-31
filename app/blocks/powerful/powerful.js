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
  sliderElement: '.js-powerful-slider',
  slidesPerView: 1,
  init() {
    if ($(this.tabs.el).length) {
      this.main();
    }

    if ($(this.sliderElement).length) {
      this.slider();
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
  slider() {
    const self = this;
    const $slider = $(this.sliderElement);

    if ($slider.length) {
      $.each($slider, function () {
        const $curSlider = $(this);
        const $nextEl = $curSlider.find('.js-powerful-slider__button-next');
        const $prevEl = $curSlider.find('.js-powerful-slider__button-prev');
        const $paginationEl = $curSlider.find('.js-powerful-slider__pagination');

        const sliderInstance = new Swiper($curSlider.find('.swiper-container'), {
          init: false,
          loop: false, // not work correctly along with "watchOverflow: true"
          autoHeight: false,
          // slidesPerView: self.slidesPerView,
          slidesPerView: 'auto',
          // slidesPerGroup: self.slidesPerView,
          spaceBetween: 24,
          watchSlidesVisibility: true,
          lazy: false,
          watchOverflow: true,

          navigation: {
            nextEl: $nextEl,
            prevEl: $prevEl,
          },

          pagination: {
            type: 'bullets',
            el: $paginationEl,
            clickable: true,
            bulletClass: 'powerful-slider__pagination-bullet',
            bulletActiveClass: 'powerful-slider__pagination-bullet_active',
            renderBullet(index, className) {
              return `<div class="${className}"><span></span></div>`;
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
          $curSlider.addClass('is-loaded');
        });

        sliderInstance.init();
      });
    }
  },
};
