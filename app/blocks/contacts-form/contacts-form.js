app.contactsForm = {
  sliderEl: '.js-contacts-steps',
  slidesPerView: 1,
  init() {
    if ($(this.sliderEl).length) {
      this.slider();
    }
  },
  slider() {
    const self = this;
    const $slider = $(this.sliderEl);

    if ($slider.length) {
      $.each($slider, function () {
        const $curSlider = $(this);
        const $prevEl = $curSlider.find('.js-contacts-steps-button-prev');
        const $nextEl = $curSlider.find('.js-contacts-steps-button-next');
        const $submitEl = $curSlider.find('.js-contacts-steps-button-submit');
        const $currentSlide = $curSlider.find('.js-contacts-steps-current');
        const $totalSlides = $curSlider.find('.js-contacts-steps-total');

        const sliderInstance = new Swiper($curSlider.find('.swiper-container'), {
          init: false,
          loop: false,
          autoHeight: true,
          slidesPerView: self.slidesPerView,
          slidesPerGroup: 1,
          spaceBetween: 24,
          watchSlidesVisibility: true,
          simulateTouch: false,

          on: {
            beforeTransitionStart() {
              $prevEl.add($nextEl).removeClass('disabled');
              $nextEl.parent().show();
              $submitEl.parent().hide();
              $currentSlide.text(sliderInstance.realIndex + 1);
              if (sliderInstance.realIndex === 0) {
                $prevEl.addClass('disabled');
              }
              if (sliderInstance.realIndex === sliderInstance.slides.length - 1) {
                $nextEl.addClass('disabled').parent().hide();
                $submitEl.parent().show();
              }
            },
          },
        });

        sliderInstance.on('init', () => {
          $curSlider.addClass('is-loaded');
          $totalSlides.text(sliderInstance.slides.length);
          if (sliderInstance.realIndex === 0) {
            $prevEl.addClass('disabled');
          }
          if (sliderInstance.realIndex === sliderInstance.slides.length - 1) {
            $nextEl.addClass('disabled').parent().hide();
            $submitEl.parent().show();
          }
        });

        sliderInstance.init();

        $prevEl.on('click', (e) => {
          e.preventDefault();
          sliderInstance.slidePrev();
        });

        $nextEl.on('click', (e) => {
          e.preventDefault();
          sliderInstance.slideNext();
        });
      });
    }
  },
};
