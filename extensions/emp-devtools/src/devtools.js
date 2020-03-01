window.test = function () {
  const inspectString = 'inspect(document.querySelector("button"))';
  window.chrome.devtools.inspectedWindow.eval(inspectString);
};
