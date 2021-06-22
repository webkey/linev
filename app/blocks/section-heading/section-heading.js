app.sectionHeading = {
  element: '.js-section-heading',
  background: '.js-section-heading-bg',
  number: '.js-section-heading-number',
  title: '.js-section-heading-title',
  init() {
    if ($(this.element).length) {
      $(this.background).add(this.number).add(this.title).css('transition-duration', '0.1s');
      this.eventEachElements();
    }
  },
  eventEachElements() {
    const self = this;
    $.each($(self.element), function () {
      self.scrollEvents($(this));
    });
  },
  scrollEvents(element) {
    const self = this;
    const $window = $(window);

    const position = $window.scrollTop();
    console.log('position: ', position);

    $window.scroll(function () {
      // console.log('$(this).scrollTop(): ', $(this).scrollTop());
      const elementPositionTop = element.position().top;
      // console.log('elementPositionTop: ', elementPositionTop);
      const windowScrollBottom = $(this).scrollTop() + window.innerHeight;
      // console.log('windowScrollBottom: ', windowScrollBottom);
      const eventSpace = 100;
      // console.log('eventSpace: ', eventSpace);
      const realEventPosition = windowScrollBottom - 100;
      // console.log('realEventPosition: ', realEventPosition);
      const effectiveHeightOfElement = element.innerHeight() - eventSpace;
      const bgGradation = (1 - 0.45) / effectiveHeightOfElement;
      const textGradation = 1 / effectiveHeightOfElement;
      // console.log('step: ', step);
      console.log('diff: ', realEventPosition - elementPositionTop);

      const bgOpacityCurrent = 1 - (realEventPosition - elementPositionTop) * bgGradation;
      let bgOpacity;
      if (bgOpacityCurrent > 0.45 && bgOpacityCurrent < 1) {
        bgOpacity = bgOpacityCurrent;
      } else if (bgOpacityCurrent < 0.45) {
        bgOpacity = 0.45;
      } else {
        bgOpacity = 1;
      }
      $(self.background, element).css('opacity', bgOpacity);

      const textOpacityCurrent = (realEventPosition - elementPositionTop) * textGradation;
      let textOpacity;
      if (textOpacityCurrent < 1 && textOpacityCurrent > 0) {
        textOpacity = textOpacityCurrent;
      } else if (textOpacityCurrent < 0) {
        textOpacity = 0;
      } else {
        textOpacity = 1;
      }
      $(self.number, element).add(self.title, element).css('opacity', textOpacity);
    });
  },
};
