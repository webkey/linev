app.common = {
  name: 'common',
  description: 'application support functions',
  init() {
    this.initScript('svg4everybody.min', 'svg4everybody', () => {
      svg4everybody();
    });
  },
  addScriptFile(nameFile, callback) {
    const body = document.getElementsByTagName('body')[0];
    const script = document.createElement('script');
    script.onload = () => callback && callback();
    script.src = `${app.pathToLibsFiles}/js/${nameFile}.js`;
    body.appendChild(script);
  },
  addStyleFile(nameFile) {
    const appCss = document.getElementById('app-css');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${app.pathToLibsFiles}/css/${nameFile}.css`;
    appCss.before(link);
  },
  initScript(nameFile, nameLib, callback) {
    let hasLibs = null;
    $('script').each(function () {
      const str = $(this).attr('src');
      if (str) {
        if (str.indexOf(nameFile) >= 0) {
          hasLibs = true;
        }
      }
    });
    if (!hasLibs) {
      this.addScriptFile(nameFile, callback);
    } else {
      const timerId = setInterval(() => {
        if ($()[nameLib] || window[nameLib]) {
          callback();
          clearInterval(timerId);
        }
      }, 1);
    }
  },
  initStyle(nameFile) {
    let hasLibs = null;
    $('link').each(function () {
      const str = $(this).attr('href');
      if (str) {
        if (str.indexOf(nameFile) >= 0) {
          hasLibs = true;
        }
      }
    });
    if (!hasLibs) {
      this.addStyleFile(nameFile);
    }
  },
};
