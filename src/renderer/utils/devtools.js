// const path = require('path');

export function getDevtoolsFrontendUrl(url) {
  const port = process.env.EMP_REMOTE_DEBUGGING_PORT;
  return fetch(`http://127.0.0.1:${port}/json`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
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
        // const port = process.env.EMP_REMOTE_DEBUGGING_PORT;
        // devtoolsView.setAttribute(
        //   'src',
        //   `http://127.0.0.1:${port}${target.devtoolsFrontendUrl}`
        // );
        devtoolsView.setAttribute(
          'src',
          'http://127.0.0.1:9222/devtools/inspector.html?ws=localhost:9223/devtools/page/14BDD6754043CFDFC82F9173A2598F7D'
        );
        // const devtoolsFrontend = path.join(process.cwd(), 'extensions/devtools/inspector.html');
        // devtoolsView.setAttribute(
        //   'src',
        //   `file:///${devtoolsFrontend}?ws=localhost:9223/devtools/page/14BDD6754043CFDFC82F9173A2598F7D`
        // );
        devtoolsView.addEventListener('dom-ready', e => {
          devtoolsView.executeJavaScript(`
            const tabbedPane = window.UI.inspectorView._tabbedLocation._tabbedPane;
            tabbedPane.closeTab('elements');
            tabbedPane.closeTab('timeline');
            tabbedPane.closeTab('resources');
          `);
        });
      }
    });
  });
}
