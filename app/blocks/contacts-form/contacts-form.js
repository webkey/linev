app.contactsForm = {
  sliderEl: '.js-contacts-steps',
  slidesPerView: 1,
  init() {
    if ($(this.sliderEl).length) {
      this.slider();
      this.selectOffice();
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
        const $currentText = $curSlider.find('.js-contacts-steps-current-text');
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
              $prevEl.add($prevEl.parent()).add($nextEl).add($nextEl.parent()).removeClass('disabled');
              $nextEl.parent().show();
              $submitEl.parent().hide();
              $currentSlide.text(sliderInstance.realIndex + 1);
              $currentText.find('div').hide().eq(sliderInstance.realIndex).show();
              if (sliderInstance.realIndex === 0) {
                $prevEl.add($prevEl.parent()).addClass('disabled');
              }
              if (sliderInstance.realIndex === sliderInstance.slides.length - 1) {
                $nextEl.add($nextEl.parent()).addClass('disabled');
                $nextEl.parent().hide();
                $submitEl.parent().show();
              }
            },
          },
        });

        sliderInstance.on('init', () => {
          $curSlider.addClass('is-loaded');
          $currentSlide.text(sliderInstance.realIndex + 1);
          $totalSlides.text(sliderInstance.slides.length);
          $currentText.find('div').hide().eq(sliderInstance.realIndex).show();
          if (sliderInstance.realIndex === 0) {
            $prevEl.add($prevEl.parent()).addClass('disabled');
          }
          if (sliderInstance.realIndex === sliderInstance.slides.length - 1) {
            $nextEl.add($nextEl.parent()).addClass('disabled');
            $nextEl.parent().hide();
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
  chooseOption(select, value) {
    $(select).val(value).trigger('change.select2');
  },
  selectOffice() {
    $('#contacts-office').on('change', function () {
      app.offices.currentId = `#${$(this).val()}`;
      app.offices.changeActive();
    });
  },
};
