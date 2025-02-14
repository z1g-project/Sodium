async function checkLatestVersion() {
  try {
    const isBeta = window.location.hostname.includes('v2');
    const branch = isBeta ? 'v2' : 'master';
    const response = await fetch(`https://raw.githubusercontent.com/z1g-project/sodium/${branch}/sodium-static/public/version.txt`);
    const latestVersion = await response.text();
    const currentVersion = '2.7.0';

    if (window.location.hostname.includes('localhost')) {
      const response1 = await fetch(`https://raw.githubusercontent.com/z1g-project/sodium/v2/sodium-static/public/version.txt`);
      const latestVersion1 = await response1.text();
      if (latestVersion1 !== currentVersion) {
        console.log('New Update is Avalible: ' + latestVersion1)
        if ('Notification' in window) {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              showUpdateNotification();
            }
          });
        }
      }
    } else {
      if (latestVersion !== currentVersion) {
        if ('Notification' in window) {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              showUpdateNotification();
            }
          });
        }
      }
    }
  } catch (error) {
    console.error('Error checking for latest version:', error);
  }
}
  
  function showUpdateNotification() {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification('New Version Available', {
        body: 'A new version of sodium is available!',
        icon: 'sodium.png'
      });
  
      notification.onclick = function () {
        window.open('https://github.com/z1g-project/sodium', '_blank');
      };
    }
  }

  