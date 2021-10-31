app.snippetHeading = {
  element: '.js-snippet-heading',
  background: '.js-snippet-heading-bg',
  number: '.js-snippet-heading-number',
  title: '.js-snippet-heading-title',
  init() {
    if ($(this.element).length && window.innerWidth > 1199) {
      $(this.background).add(this.number).add(this.title).css('transition-duration', '0.2s');
      this.eventEachElements();
    }
  },
  eventEachElements() {
    const self = this;
    // self.scrollEvents($(self.element));
    $.each($(self.element), function (index) {
      self.scrollEvents($(this), index);
    });
  },
  scrollEvents(element) {
    const self = this;
    const $window = $(window);

    $window.scroll(function () {
      const windowScrollTop = $(this).scrollTop();

      // Background
      const $background = $(self.background, element);
      self.hideElement($background, windowScrollTop, 1, 0.2);

      // Number
      const $number = $(self.number, element);
      self.showElement($number, windowScrollTop);

      // Title
      const $title = $(self.title, element);
      self.showElement($title, windowScrollTop);
    });
  },
  hideElement(element, windowScrollTop, opacityStar, opacityEnd) {
    const headerHeight = $('.header').innerHeight();
    const eventSpaceTop = Math.round(window.innerHeight / 3);

    const animateStartPoint = Math.round(element.offset().top - window.innerHeight) + eventSpaceTop;
    const animateEndPoint = Math.round(element.offset().top - headerHeight);
    const propGradation = (opacityStar - opacityEnd) / (animateEndPoint - animateStartPoint);
    const bgOpacityCurrent = 1 - (windowScrollTop - animateStartPoint) * propGradation;
    let bgOpacity;
    if (bgOpacityCurrent > opacityEnd && bgOpacityCurrent < 1) {
      bgOpacity = bgOpacityCurrent;
    } else if (bgOpacityCurrent < opacityEnd) {
      bgOpacity = opacityEnd;
    } else {
      bgOpacity = 1;
    }
    element.css('opacity', bgOpacity);
  },
  showElement(element, windowScrollTop) {
    if (element.length) {
      const headerHeight = $('.header').innerHeight();
      const eSpaceTop = Math.round(window.innerHeight / 3);

      const animateStartPoint = Math.round(element.offset().top - window.innerHeight) + eSpaceTop;
      const animateEndPoint = Math.round(element.offset().top - headerHeight - 50);
      const gradation = 1 / (animateEndPoint - animateStartPoint);
      const opacityByGradation = (windowScrollTop - animateStartPoint) * gradation;
      let opacity;
      if (opacityByGradation < 1 && opacityByGradation > 0) {
        opacity = opacityByGradation;
      } else if (opacityByGradation < 0) {
        opacity = 0;
      } else {
        opacity = 1;
      }
      element.css('opacity', opacity);
    }
  },
};
