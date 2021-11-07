app.rotate = {
  element: '.js-rotate',
  sliderElement: '.js-rotate-slider',
  init() {
    if ($(this.sliderElement).length) {
      this.slider();
    }
  },
  slider() {
    const self = this;
    const $slider = $(this.sliderElement);

    if ($slider.length) {
      $.each($slider, function () {
        const $curSlider = $(this);
        const $nextEl = $curSlider.find('.js-rotate-slider-button-next');
        const $prevEl = $curSlider.find('.js-rotate-slider-button-prev');
        const $paginationEl = $curSlider.find('.js-rotate-slider-pagination');

        const sliderInstance = new Swiper($curSlider.find('.swiper-container'), {
          init: false,
          loop: false, // not work correctly along with "watchOverflow: true"
          autoHeight: false,
          // slidesPerView: 'auto',
          slidesPerView: 3,
          slidesPerGroup: 3,
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
            bulletClass: 'rotate__slider-pagination-bullet',
            bulletActiveClass: 'rotate__slider-pagination-bullet_active',
            renderBullet(index, className) {
              return `<div class="${className}"><span></span></div>`;
            },
          },

          breakpoints: {
            767: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 16,
            },
            374: {
              slidesPerView: 'auto',
              slidesPerGroup: 1,
              spaceBetween: 10,
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
