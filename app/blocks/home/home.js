app.home = {
  initEl: '#js-fp',
  sectionEl: '#js-fp > section',
  nextBtnEl: '.js-fp-next',
  duration: 500,
  init() {
    if ($(this.initEl).length) {
      this.run();
    }
  },
  run() {
    const self = this;
    let scrollStep;
    // let timeoutVisualSet;
    $(this.initEl).fullpage({
      sectionSelector: self.sectionEl,
      lockAnchors: false,
      anchors: self.historyAnchors(),
      recordHistory: false,
      keyboardScrolling: false,
      touchSensitivity: 10, // default - 5
      verticalCentered: false,
      scrollingSpeed: self.duration,
      licenseKey: '11111111-11111111-11111111-11111111',
      navigation: true,
      navigationPosition: 'right',
      navigationTooltips: self.historyAnchors(),
      afterLoad(origin, destination) {
        $(self.sectionEl).removeClass('animation-end');
        console.log('afterLoad');

        // Step scroll
        clearTimeout(scrollStep);
        scrollStep = setTimeout(() => {
          fullpage_api.setAllowScrolling(true);
        }, self.duration);

        const $destinationEl = $(destination.item);
        // const $originEl = $(origin.item);

        $destinationEl.addClass('animation-end');

        // Удалить класс трансформации шапки после завершения анимации листания
        if (destination.isFirst) {
          $('.header').add('.header-menu').removeClass('is-collapsed');
        }

        if (destination.isLast && $destinationEl.hasClass('fp-auto-height')) {
          $(origin.item).addClass('animation-end');
        }

        // clearTimeout(timeoutVisualSet);

        // timeoutVisualSet = setTimeout(function () {
        //   // Play accident video
        //   const $accident = $destinationEl.find('.accident');
        //   if ($accident.length) {
        //     app.accident.playVideo();
        //   }
        // }, 50);

        // Reset accident video
        // const $accident = $originEl.find('.accident');
        // if ($accident.length) {
        //   app.accident.resetVideo();
        // }
      },
      onLeave(origin, destination) {
        console.log('onLeave');
        fullpage_api.setAllowScrolling(false);

        $(self.sectionEl).removeClass('animation-start');

        const $destinationEl = $(destination.item);
        const $originEl = $(origin.item);

        // Добавить класс трансформации шапки до начала анимации листания
        if (!destination.isFirst) {
          $('.header').add('.header-menu').addClass('is-collapsed').removeClass('is-expanded');
        } else {
          $('.header').add('.header-menu').addClass('is-expanded').removeClass('is-collapsed');
        }

        $destinationEl.addClass('animation-start');
        if (destination.isLast && $destinationEl.hasClass('fp-auto-height')) {
          $originEl.addClass('animation-start');
        }

        // if (app.scan) {
        //   app.scan.reset();
        // }
        //
        // if (app.macro) {
        //   app.macro.reset();
        // }
        //
        // if (app.micro) {
        //   app.micro.reset();
        // }

        if (app.lang) {
          $('.js-lang-control').switchClass('remove');
        }

        if (app.headerSearch) {
          $('.js-header-search-control').switchClass('remove');
        }
      },
      afterRender() {
        console.log('render');
        $('.js-fp-first').on('click', (e) => {
          e.preventDefault();
          fullpage_api.moveTo(1);
        });
      },
    });
  },
  historyAnchors() {
    const anchors = [];

    $.each($(this.sectionEl), function () {
      anchors.push($(this).attr('data-anchor'));
    });

    return anchors;
  },
};
