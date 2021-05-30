app.home = {
  initEl: '#js-fp',
  sectionEl: '#js-fp > section',
  nextBtnEl: '.js-fp-next',
  typeTextAnimationEl: '.js-type-text-animation',
  duration: 500,
  init() {
    if ($(this.initEl).length) {
      this.run();
      this.typeAnimation();
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
        const $originEl = $(origin.item);

        $destinationEl.addClass('animation-end').addClass('after-ready');

        // Удалить класс трансформации шапки после завершения анимации листания
        if (destination.isFirst) {
          $('.header').add('.header-menu').removeClass('is-collapsed');
        }

        if (destination.isLast && $destinationEl.hasClass('fp-auto-height')) {
          $(origin.item).addClass('animation-end');
        }

        // На вторую секцию добавить класс удаления тени
        if (destination.index > 0) {
          $(self.sectionEl).addClass('hide-shade');
        }
        if (destination.isFirst) {
          $originEl.removeClass('hide-shade');
        }

        // Открыть первый рол
        const $innovative = $('.js-innovative-data', $destinationEl);
        if ($innovative.length) {
          $innovative.msRolls('open', $('#auto-open'));
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

        $destinationEl.addClass('animation-start').addClass('before-ready');
        if (destination.isLast && $destinationEl.hasClass('fp-auto-height')) {
          $originEl.addClass('animation-start');
        }

        // На вторую секцию добавить класс удаления тени
        if (origin.isFirst) {
          $destinationEl.addClass('hide-shade');
        }
        if (destination.isFirst) {
          $originEl.removeClass('hide-shade');
        }

        // Запустить анимацию "набор текста"
        const typeitInstanceDest = $destinationEl.data('typeit');
        if (typeitInstanceDest && !(typeitInstanceDest.is('started') || typeitInstanceDest.is('completed'))) {
          typeitInstanceDest.go();
        }
        if (typeitInstanceDest && typeitInstanceDest.is('frozen')) {
          typeitInstanceDest.unfreeze();
        }
        const typeitInstanceOrig = $originEl.data('typeit');
        if (typeitInstanceOrig && typeitInstanceOrig.is('started') && !typeitInstanceOrig.is('completed')) {
          typeitInstanceOrig.freeze();
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
  typeAnimation() {
    const elements = document.querySelectorAll(this.typeTextAnimationEl);

    elements.forEach((el) => {
      const instance = new TypeIt(el, {
        speed: 50,
        waitUntilVisible: true,
        loop: false,
      });

      $(el).closest(this.sectionEl).data('typeit', instance);
    });
  },
};
