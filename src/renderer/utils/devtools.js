export function getDevtoolsFrontendUrl(url) {
  const port = process.env.EMP_REMOTE_DEBUGGING_PORT;
  return fetch(`http://127.0.0.1:${port}/json`)
    .then(res => res.json())
    .then(res => {
      const target = res.find(
        child => child.type === 'webview' && child.url === url
      );
      return target;
    });
}

export function connectSimulatorDevTools(simulatorView, devtoolsView) {
  simulatorView.addEventListener('dom-ready', () => {
    const simulatorContents = simulatorView.getWebContents();
    const devtoolsContents = devtoolsView.getWebContents();
    simulatorContents.setDevToolsWebContents(devtoolsContents);
    simulatorContents.openDevTools();
    devtoolsView.addEventListener('dom-ready', e => {
      // Inject JS
      devtoolsView.executeJavaScript(`
        const tabbedPane = window.UI.inspectorView._tabbedLocation._tabbedPane;
        tabbedPane.closeTab('elements');
        tabbedPane.closeTab('timeline');
        tabbedPane.closeTab('resources');
      `);
    });
  });
}
