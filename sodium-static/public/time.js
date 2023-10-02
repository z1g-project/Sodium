function updateBatteryIcon(percentage, isCharging) {
  const batteryElement = document.getElementById('battery');

  if (isCharging) {
    if (percentage <= 20) {
      batteryElement.className = 'battery-icon charging low';
    } else if (percentage <= 50) {
      batteryElement.className = 'battery-icon charging medium';
    } else {
      batteryElement.className = 'battery-icon charging high';
    }
  } else {
    if (percentage <= 20) {
      batteryElement.className = 'battery-icon low';
    } else if (percentage <= 50) {
      batteryElement.className = 'battery-icon medium';
    } else {
      batteryElement.className = 'battery-icon high';
    }
  }
}

function updateBatteryText(percentage, isCharging) {
  const batteryTextElement = document.querySelector('.battery-text');

  if (
    batteryTextElement.classList.contains('low') ||
    batteryTextElement.classList.contains('charging-low')
  ) {
    batteryTextElement.style.color = 'black';
  } else {
    batteryTextElement.style.color = 'white';
  }

  const chargingSymbol = isCharging ? ' ⚡' : '';
  batteryTextElement.textContent = `${chargingSymbol}${percentage}%`;
}

function formatTime(time, use24HourTime, useSeconds) {
  if (use24HourTime) {
    return time < 10 ? '0' + time : time;
  } else {
    const isPM = time >= 12;
    time = time % 12 || 12;
    let formattedTime = time < 10 ? '0' + time : time;
    if (isPM) {
      formattedTime += ' PM';
    } else {
      formattedTime += ' AM';
    }
    if (useSeconds) {
      formattedTime += ':' + formatTimeSeconds(new Date().getSeconds());
    }
    return formattedTime;
  }
}

function formatTimeSeconds(seconds) {
  return seconds < 10 ? '0' + seconds : seconds;
}

function updateTime() {
  const timeElement = document.getElementById('time');
  const currentTime = new Date();
  let hours = currentTime.getHours();
  const minutes = formatTime(currentTime.getMinutes(), true, localStorage.getItem('useSeconds') === 'true');
  let seconds = '';

  if (localStorage.getItem('useSeconds') === 'true') {
    seconds = ':' + formatTime(currentTime.getSeconds(), true, false);
  }

  let timeString = '';

  if (localStorage.getItem('use24HourTime') === 'true') {
    timeString = formatTime(hours, localStorage.getItem('use24HourTime') === 'true', false) + ':' + minutes + seconds;
  } else {
    const isPM = hours >= 12;
    hours = hours % 12 || 12;
    timeString = hours + ':' + minutes + seconds + (isPM ? ' PM' : ' AM');
  }

  if (localStorage.getItem('showDate') === 'true') {
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const dateString = currentTime.toLocaleDateString(undefined, options);
    timeString = dateString + ' ' + timeString;
  }

  timeElement.textContent = timeString;
}

function getBatteryInfo() {
  if ('getBattery' in navigator) {
    navigator.getBattery().then(function(battery) {
      const batteryPercentage = Math.floor(battery.level * 100);
      const isCharging = battery.charging;

      updateBatteryIcon(batteryPercentage, isCharging);
      updateBatteryText(batteryPercentage, isCharging);
    });
  } else if ('battery' in navigator) {
    const battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
    const batteryPercentage = Math.floor(battery.level * 100);
    const isCharging = battery.charging;

    updateBatteryIcon(batteryPercentage, isCharging);
    updateBatteryText(batteryPercentage, isCharging);
  }
}

window.addEventListener('DOMContentLoaded', function () {
  const use24HourTimeCheckbox = document.getElementById('checkbox-24h');
  if (use24HourTimeCheckbox) {
    use24HourTimeCheckbox.checked = localStorage.getItem('use24HourTime') === 'true';

    use24HourTimeCheckbox.addEventListener('change', function (event) {
      localStorage.setItem('use24HourTime', event.target.checked);
    });
  }

  const includeDateCheckbox = document.getElementById('checkbox-show-date');
  if (includeDateCheckbox) {
    includeDateCheckbox.checked = localStorage.getItem('showDate') === 'true';

    includeDateCheckbox.addEventListener('change', function (event) {
      localStorage.setItem('showDate', event.target.checked);
    });
  }

  const useSecondsCheckbox = document.getElementById('use-seconds-checkbox');
  if (useSecondsCheckbox) {
    useSecondsCheckbox.checked = localStorage.getItem('useSeconds') === 'true';

    useSecondsCheckbox.addEventListener('change', function (event) {
      localStorage.setItem('useSeconds', event.target.checked);
    });
  }
});

const customCSS = localStorage.getItem('websiteCSS');
    if (customCSS) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'custom-css';
      styleSheet.textContent = customCSS;
      document.head.appendChild(styleSheet);
    } else {
      const defaultStyleSheet = document.createElement('link');
      defaultStyleSheet.rel = 'stylesheet';
      defaultStyleSheet.href = 'ui.css';
      defaultStyleSheet.id = 'custom-css';
      document.head.appendChild(defaultStyleSheet);
    }

    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      const openNewWindow = localStorage.getItem('openNewWindow');
    
      if (openNewWindow === 'true') {
        const newWindow = window.open('about:blank', '_blank');
        const newDocument = newWindow.document.open();
        newDocument.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <style type="text/css">
                body, html
                {
                  margin: 0; padding: 0; height: 100%; overflow: hidden;
                }
             </style>
            </head>
            <body>
              <iframe style="border: none; width: 100%; height: 100vh;" src="/newtab.html"></iframe>
            </body>
          </html>
        `);
        newDocument.close();
        const fallbackUrl = localStorage.getItem('fallbackUrl');
    
        if (fallbackUrl) {
          window.location.href = fallbackUrl;
        }
      } else {
        
      }
    }

    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      const openBlobWindow = localStorage.getItem('openblobwindow');
    
      if (openBlobWindow === 'true') {
        const iframeURL = window.location.origin + '/newtab.html';
        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <style type="text/css">
                body, html {
                  margin: 0;
                  padding: 0;
                  height: 100%;
                  overflow: hidden;
                }
              </style>
            </head>
            <body>
              <iframe style="border: none; width: 100%; height: 100vh;" src="${iframeURL}"></iframe>
            </body>
          </html>
        `;
    
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const blobURL = URL.createObjectURL(blob);
        
        const newWindow = window.open(blobURL, '_blank');
        
        if (newWindow) {
          newWindow.addEventListener('beforeunload', () => {
            URL.revokeObjectURL(blobURL);
          });
        } else {

        }

        const fallbackUrl = localStorage.getItem('fallbackUrl');
          if (fallbackUrl) {
            window.location.href = fallbackUrl;
        }
      }
    }       
    
    const betaMode = localStorage.getItem('betaMode');

    if (betaMode === 'true') {
      if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        window.location.href = '/tabs/';
      }
    } else {
      
    }

    const firstRun = localStorage.getItem('firstRun');

    if (firstRun === null || firstRun === 'true') {
      if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        window.location.href = '/welcome.html';
      }
    }

    document.addEventListener('keydown', function (event) {
      console.log('Keydown event:', event);
      const target = event.target;
      const customCSS = localStorage.getItem('emergencyHotkey');
      if (customCSS && (!target || (target.nodeName !== 'INPUT' || target.getAttribute('id') !== 'uv-address'))) {
        const pressedKey = event.key.toLowerCase();
        const emergencyHotkey = localStorage.getItem('emergencyHotkey');
  
        if (pressedKey === emergencyHotkey) {
          const emergencyURL = localStorage.getItem('emergencyURL');
  
          if (emergencyURL) {
            window.location.href = emergencyURL;
          }
        }
      }
    });

getBatteryInfo();

updateTime();

setInterval(updateTime, 1000);

setInterval(getBatteryInfo, 1000);
