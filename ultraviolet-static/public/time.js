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
  return time < 10 ? '0' + time : time;
}

function updateTime() {
  const timeElement = document.getElementById('time');
  const currentTime = new Date();
  let hours = currentTime.getHours();
  const minutes = formatTime(currentTime.getMinutes(), localStorage.getItem('use24HourTime') === 'true', localStorage.getItem('useSeconds') === 'true');
  let timeString = '';

  if (hours > 12 && localStorage.getItem('use24HourTime') !== 'true') {
    hours -= 12;
    timeString = hours + ':' + minutes + ' PM';
  } else {
    if (hours === 0) {
      hours = 12;
    }
    timeString = hours + ':' + minutes + (localStorage.getItem('use24HourTime') === 'true' ? '' : ' AM');
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

window.addEventListener('DOMContentLoaded', function() {
  const use24HourTimeCheckbox = document.getElementById('use-24hour-checkbox');
  if (use24HourTimeCheckbox) {
    use24HourTimeCheckbox.checked = localStorage.getItem('use24HourTime') === 'true';
  }

  const includeDateCheckbox = document.getElementById('include-date-checkbox');
  if (includeDateCheckbox) {
    includeDateCheckbox.checked = localStorage.getItem('showDate') === 'true';
  }

  const useSecondsCheckbox = document.getElementById('use-seconds-checkbox');
  if (useSecondsCheckbox) {
    useSecondsCheckbox.checked = localStorage.getItem('useSeconds') === 'true';
  }
});

window.addEventListener('change', function(event) {
  const target = event.target;

  if (target.id === 'use-24hour-checkbox') {
    localStorage.setItem('use24HourTime', target.checked);
  }

  if (target.id === 'include-date-checkbox') {
    localStorage.setItem('showDate', target.checked);
  }

  if (target.id === 'use-seconds-checkbox') {
    localStorage.setItem('useSeconds', target.checked);
  }
});

getBatteryInfo();

updateTime();

setInterval(updateTime, 1000);
