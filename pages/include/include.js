function header(rootDir) {
  directory = rootDir || '';
  this.include('include-header', rootDir, 'include/header.html');
}

function footer(rootDir) {
  directory = rootDir || '';
  this.include('include-footer', rootDir, 'include/footer.html');
}

function include(id, rootDir, directory) {
  rootDir = rootDir || '';
  directory = rootDir + directory;
  $.get(directory, function (html) {
    html = html.replace(/\{\$root\}/g, rootDir);
    const element = document.getElementById(id);
    element.innerHTML = html;
    unwrap(element);
  });
}

const unwrap = target => {
  while (target.firstChild) {
    target.parentNode.insertBefore(target.firstChild, target);
  }
  target.remove();
};

window.onload = function () {
  Array.from(document.getElementsByTagName('script')).forEach(element => element.remove());
}