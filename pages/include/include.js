function header(rootDir) {
  rootDir = rootDir || '';
  $.ajax({
    url: rootDir + 'include/header.html',
    cache: false,
    async: false,
    dataType: 'html',
    success: function(html) {
      html = html.replace(/\{\$root\}/g, rootDir);
      document.write(html);
    },
  });
}

function footer(rootDir) {
  rootDir = rootDir || '';
  $.ajax({
    url: rootDir + 'include/footer.html',
    cache: false,
    async: false,
    dataType: 'html',
    success: function(html) {
      html = html.replace(/\{\$root\}/g, rootDir);
      document.write(html);
    },
  });
}
