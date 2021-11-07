app.gallery = {
  sliderElement: '.js-gallery-slider',
  currentInstance: null,
  currentZoomSlide: null,
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
        const $nextEl = $curSlider.find('.js-gallery-slider-button-next');
        const $prevEl = $curSlider.find('.js-gallery-slider-button-prev');
        const $paginationEl = $curSlider.find('.js-gallery-slider-pagination');

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
            bulletClass: 'gallery__slider-pagination-bullet',
            bulletActiveClass: 'gallery__slider-pagination-bullet_active',
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

        $curSlider.data('instance', sliderInstance);

        sliderInstance.on('init', () => {
          $curSlider.addClass('is-loaded');
        });

        sliderInstance.init();

        Fancybox.bind('.js-gallery-slider [data-fancybox]', {
          dragToClose: false,
          Toolbar: false,
          closeButton: 'top',
          showClass: 'fancybox-fadeIn',
          hideClass: 'fancybox-fadeOut',

          on: {
            initCarousel: (fancybox) => {
              const slide = fancybox.Carousel.slides[fancybox.Carousel.page];

              self.currentInstance = $(fancybox.items[0].$trigger).closest(self.sliderElement).data('instance');
              self.currentZoomSlide = slide.index;

              fancybox.$container.style.setProperty(
                '--bg-image',
                `url("${slide.$thumb.src}")`,
              );
            },
            'Carousel.change': (fancybox, carousel, to) => {
              const slide = carousel.slides[to];

              self.currentZoomSlide = slide.index;

              fancybox.$container.style.setProperty(
                '--bg-image',
                `url("${slide.$thumb.src}")`,
              );
            },
            shouldClose: () => {
              self.currentInstance.slideTo(self.currentZoomSlide, 0);
            },
          },
        });
      });
    }
  },
};
