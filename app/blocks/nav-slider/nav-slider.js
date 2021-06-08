app.navSlider = {
  sliderEl: '.js-nav-slider',
  anchor: '.js-nav-slider-anchor',
  slidesPerView: 6,
  init() {
    if ($(this.sliderEl).length) {
      this.slider();
      this.scrollTo();
    }
  },
  slider() {
    const self = this;
    const $slider = $(this.sliderEl);

    if ($slider.length) {
      $.each($slider, function () {
        const $curSlider = $(this);
        const $nextEl = $curSlider.find('.js-nav-slider-button-next');
        const $prevEl = $curSlider.find('.js-nav-slider-button-prev');
        const $paginationEl = $curSlider.find('.js-nav-slider-pagination');

        const sliderInstance = new Swiper($curSlider.find('.swiper-container'), {
          init: false,
          loop: false, // not work correctly along with "watchOverflow: true"
          autoHeight: false,
          slidesPerView: self.slidesPerView,
          // slidesPerView: 'auto',
          slidesPerGroup: 1,
          spaceBetween: 28,
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
            bulletClass: 'nav-slider__pagination-bullet',
            bulletActiveClass: 'nav-slider__pagination-bullet_active',
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
  scrollTo() {
    $(this.anchor).on('click', function (e) {
      e.preventDefault();

      const $this = $(this);
      const id = $this.attr('href');

      if ($(id).length) {
        const $html = $('html, body');
        if (!$html.is(':animated')) {
          $html.stop().animate({
            scrollTop: $(id).offset().top - $('.header').innerHeight(),
          }, 300);
        }
      }
    });
  },
};
