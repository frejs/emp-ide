let panelLoaded = false;
let panelShown = false;
let created = false;
let checkCount = 0;

window.chrome.devtools.network.onNavigated.addListener(createPanelIfHasVue);
const checkVueInterval = setInterval(createPanelIfHasVue, 1000);
createPanelIfHasVue();

function createPanelIfHasVue() {
  if (created || checkCount++ > 10) {
    clearInterval(checkVueInterval);
    return;
  }
  panelLoaded = false;
  panelShown = false;
  window.chrome.devtools.inspectedWindow.eval(
    '!!(window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue)',
    function(hasVue) {
      if (!hasVue || created) {
        return;
      }
      clearInterval(checkVueInterval);
      created = true;
      window.chrome.devtools.panels.create(
        'emp',
        'icons/128.png',
        'devtools.html',
        panel => {
          // panel loaded
          panel.onShown.addListener(onPanelShown);
          panel.onHidden.addListener(onPanelHidden);
        }
      );
    }
  );
}

function onPanelShown() {
  window.chrome.runtime.sendMessage('emp-panel-shown');
  panelShown = true;
}

function onPanelHidden() {
  window.chrome.runtime.sendMessage('emp-panel-hidden');
  panelShown = false;
}
