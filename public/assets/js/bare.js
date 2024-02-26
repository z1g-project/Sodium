function setBare() {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      action: 'updateBareServerUrl',
    });
  }
  //console.log('Sent Bare Switch Request');
}

setBare()
