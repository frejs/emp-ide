export function getTargetRemoteDebugger(url) {
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
