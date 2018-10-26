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

function generateCommonHeader(baseUrl) {
  importCSS(baseUrl + "/css/style.css");
  return this.importScript(baseUrl + 'include/include.js', function () {
    const body = document.getElementsByTagName('body')[0];
    const headerEl = document.createElement('div');
    headerEl.id = "include-header";
    body.insertBefore(headerEl, body.firstChild);
    header('../');

    const footerEl = document.createElement('div');
    footerEl.id = "include-footer";
    body.append(footerEl);
    footer('../');
  })
}

function loadError(oError) {
  throw new URIError("The script " + oError.target.src + " is not accessible.");
}

function importScript(sSrc, fOnload) {
  const oScript = document.createElement("script");
  oScript.type = "text\/javascript";
  oScript.src = sSrc;
  oScript.onerror = loadError;
  if (fOnload) { oScript.onload = fOnload; }
  document.getElementsByTagName("head")[0].appendChild(oScript);
  return oScript;
}

function importCSS(hHref, fOnload) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text\/css";
  link.href = hHref;
  link.onerror = loadError;
  if (fOnload) { link.onload = fOnload; }
  document.getElementsByTagName("head")[0].appendChild(link);
  return link;
}