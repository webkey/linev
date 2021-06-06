app.powerfulDataSlider = {
  sliderElement: '.js-powerful-slider',
  slidesPerView: 1,
  init() {
    if ($(this.sliderElement).length) {
      this.slider();
    }
  },
  slider() {
    const $slider = $(this.sliderElement);

    if ($slider.length) {
      $.each($slider, function () {
        const $curSlider = $(this);
        const $nextEl = $curSlider.find('.js-powerful-data__slider-button-next');
        const $prevEl = $curSlider.find('.js-powerful-data__slider-button-prev');
        const $paginationEl = $curSlider.find('.js-powerful-data__slider-pagination');

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
