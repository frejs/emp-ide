// OnInstall handler
window.chrome.runtime.onInstalled.addListener(details => {
  window.console.log(details);
});
