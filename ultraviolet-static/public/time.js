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
  batteryTextElement.textContent = `${chargingSymbol} ${percentage}%`;
}

function formatTime(time) {
  return time < 10 ? '0' + time : time;
}

function updateTime() {
  const timeElement = document.getElementById('time');
  const currentTime = new Date();
  let hours = currentTime.getHours();
  const minutes = formatTime(currentTime.getMinutes());
  let timeString = '';

  if (hours > 12) {
    hours -= 12;
    timeString = hours + ':' + minutes + ' PM';
  } else {
    if (hours === 0) {
      hours = 12;
    }
    timeString = hours + ':' + minutes + ' AM';
  }

  timeElement.textContent = timeString;
}

function getBatteryInfo() {
  if ('getBattery' in navigator) {
    navigator.getBattery().then(function(battery) {
      const batteryPercentage = Math.floor(battery.level * 100);
      const isCharging = battery.charging;

      updateBatteryIcon(batteryPercentage, isCharging);
      updateBatteryText(batteryPercentage);
    });
  } else if ('battery' in navigator) {
    const battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
    const batteryPercentage = Math.floor(battery.level * 100);
    const isCharging = battery.charging;

    updateBatteryIcon(batteryPercentage, isCharging);
    updateBatteryText(batteryPercentage);
  }
}

  document.addEventListener('keydown', function (event) {
    console.log('Keydown event:', event);
    const pressedKey = event.key.toLowerCase();
    const emergencyHotkey = localStorage.getItem('emergencyHotkey');

    if (pressedKey === emergencyHotkey) {
      const emergencyURL = localStorage.getItem('emergencyURL');

      if (emergencyURL) {
        window.location.href = emergencyURL;
      }
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
        const newWindow = window.open('about:blank', '_blank', 'width=800,height=600');
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
    
    const betaMode = localStorage.getItem('betaMode');

    if (betaMode === 'true') {
      if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        window.location.href = '/beta.html';
      }
    } else {
      
    }

getBatteryInfo();

updateTime();

setInterval(updateTime, 1000);
