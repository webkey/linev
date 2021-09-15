app.home = {
  initEl: '#js-fp',
  sectionEl: '#js-fp > section',
  nextBtnEl: '.js-fp-next',
  firstBtnEl: '.js-fp-first',
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
    // let scrollStep;
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
      navigation: false,
      navigationPosition: 'right',
      navigationTooltips: self.historyAnchors(),
      responsiveWidth: 1200,
      responsiveHeight: 500,
      afterLoad(origin, destination) {
        $(self.sectionEl).removeClass('animation-end');

        // Step scroll
        // clearTimeout(scrollStep);
        // scrollStep = setTimeout(() => {
        //   fullpage_api.setAllowScrolling(true);
        // }, self.duration);

        const $destinationEl = $(destination.item);
        const $originEl = $(origin.item);

        $destinationEl.addClass('animation-end').addClass('after-ready');

        // Удалить класс трансформации шапки после завершения анимации листания
        if (destination.isFirst) {
          $('.header').add('.header-menu').removeClass('is-collapsed');
        }

        if (destination.isLast && $destinationEl.hasClass('fp-auto-height')) {
          $destinationEl.prev().addClass('animation-end').addClass('after-ready');
          // $(origin.item).addClass('animation-end');
        }

        // На вторую секцию добавить класс удаления тени
        if (destination.index > 0) {
          $(self.sectionEl).addClass('hide-shade');
        }
        if (destination.isFirst) {
          $originEl.removeClass('hide-shade');
        }
      },
      onLeave(origin, destination) {
        // fullpage_api.setAllowScrolling(false);

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
          $destinationEl.prev().addClass('animation-start').addClass('before-ready');
          // $originEl.addClass('animation-start');
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
          setTimeout(() => {
            typeitInstanceDest.pause(500).go();
          }, 1200);
        }
        if (typeitInstanceDest && typeitInstanceDest.is('frozen')) {
          typeitInstanceDest.unfreeze();
        }
        const typeitInstanceOrig = $originEl.data('typeit');
        if (typeitInstanceOrig && typeitInstanceOrig.is('started') && !typeitInstanceOrig.is('completed')) {
          typeitInstanceOrig.freeze();
        }

        if (app.lang) {
          $('.js-lang-control').switchClass('remove');
        }

        if (app.headerSearch) {
          $('.js-header-search-control').switchClass('remove');
        }
      },
      afterRender() {
        $(self.firstBtnEl).on('click', (e) => {
          e.preventDefault();
          fullpage_api.moveTo(1);
        });
        $(self.nextBtnEl).on('click', (e) => {
          e.preventDefault();
          fullpage_api.moveSectionDown();
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
        speed: 30,
        waitUntilVisible: true,
        loop: false,
      });

      $(el).closest(this.sectionEl).data('typeit', instance);
    });
  },
};
