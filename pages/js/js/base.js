function onClickMenu() {
  Array.from(document.getElementsByClassName("menu-trigger")).forEach(val => val.classList.toggle("active"));
  Array.from(document.getElementsByClassName("menu")).forEach(val => val.classList.toggle("open"));
}

WebFont.load({
  custom: {
    families: ['header', 'body'],
  },
  active: function () { },
  fontactive: function (font_family) {
    // document.getElementById(font_family).classList.add('wf-active');
    /*
    if (font_family === 'header') {
      Array.from(document.getElementsByTagName('header')).forEach(element => {
        element.classList.add('word-active');
      });
    }
    if (font_family === 'body') {
      Array.from((elements = document.getElementsByTagName('body'))).forEach(element => {
        element.classList.add('word-active');
      });

    }
    */
  },
  fontinactive: function (font_family) {
    document.getElementById(font_family).classList.add('wf-active');
    /*
    if (font_family === 'header') {
      Array.from(document.getElementsByTagName('header')).forEach(element => {
        element.classList.add('word-active');
      });
    }
    if (font_family === 'body') {
      Array.from(document.getElementsByTagName('body')).forEach(element => {
        element.classList.add('word-active');
      });

    }
    */
  },
});
