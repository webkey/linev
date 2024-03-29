app.newsFeed = {
  sliderElement: '.js-news-feed-slider',
  slidesPerView: 2,
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
        const $nextEl = $curSlider.find('.js-news-feed-slider-button-next');
        const $prevEl = $curSlider.find('.js-news-feed-slider-button-prev');
        const $paginationEl = $curSlider.find('.js-news-feed-slider-pagination');

        const sliderInstance = new Swiper($curSlider.find('.swiper-container'), {
          init: false,
          loop: false, // not work correctly along with "watchOverflow: true"
          autoHeight: false,
          // slidesPerView: 'auto',
          slidesPerView: self.slidesPerView,
          slidesPerGroup: self.slidesPerView,
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
            bulletClass: 'insights-slider__pagination-bullet',
            bulletActiveClass: 'insights-slider__pagination-bullet_active',
            renderBullet(index, className) {
              return `<div class="${className}"><span></span></div>`;
            },
          },

          breakpoints: {
            575: {
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
