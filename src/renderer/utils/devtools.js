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
    getDevtoolsFrontendUrl(simulatorView.src).then(target => {
      if (target) {
        console.log(target);
        const port = process.env.EMP_REMOTE_DEBUGGING_PORT;
        devtoolsView.setAttribute(
          'src',
          `http://127.0.0.1:${port}${target.devtoolsFrontendUrl}`
        );
        devtoolsView.addEventListener('dom-ready', e => {
          // Inject JS
          devtoolsView.executeJavaScript(`
            const tabbedPane = window.UI.inspectorView._tabbedLocation._tabbedPane;
            tabbedPane.closeTab('timeline');
            tabbedPane.closeTab('resources');
          `);
        });
        const simulatorContents = simulatorView.getWebContents();
        const devtoolsContents = devtoolsView.getWebContents();
        simulatorContents.setDevToolsWebContents(devtoolsContents);
        simulatorContents.openDevTools({
          mode: 'detach'
        });
      }
    });
  });
}
