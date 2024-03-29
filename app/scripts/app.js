const app = {
  pathToLibsFiles: './assets/libs',
};
window.app = app;

// polyfills
(function (arr) {
  arr.forEach((item) => {
    if (item.hasOwnProperty('before')) {
      return;
    }
    Object.defineProperty(item, 'before', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function before() {
        // eslint-disable-next-line prefer-rest-params
        const argArr = Array.prototype.slice.call(arguments);
        const docFrag = document.createDocumentFragment();
        argArr.forEach((argItem) => {
          const isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        this.parentNode.insertBefore(docFrag, this);
      },
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
