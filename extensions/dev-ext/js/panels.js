function setSelectedElement() {
  window.chrome.devtools.inspectedWindow.eval('alert(1)', function (result, isException) {

  });
  window.chrome.devtools.inspectedWindow.eval('inspect(document.images[0])', function (result, isException) { });
}
