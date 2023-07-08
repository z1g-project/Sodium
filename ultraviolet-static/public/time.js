// Function to update battery icon
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

// Get battery percentage and charging status
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

function updateConnectionStatus(connectionType) {
  const connectionElement = document.getElementById('connection');

  // Clear existing classes
  connectionElement.className = 'internet-connection';

  // Set appropriate class based on the connection type
  if (connectionType === 'ethernet') {
    connectionElement.classList.add('ethernet-connected');
  } else if (connectionType === 'cell_none') {
    connectionElement.classList.add('cell-none');
  } else if (connectionType === 'cell_bad') {
    connectionElement.classList.add('cell-bad');
  } else if (connectionType === 'cell_low') {
    connectionElement.classList.add('cell-low');
  } else if (connectionType === 'cell_med') {
    connectionElement.classList.add('cell-med');
  } else if (connectionType === 'cell_good') {
    connectionElement.classList.add('cell-good');
  } else if (connectionType === 'cell_best') {
    connectionElement.classList.add('cell-best');
  } else if (connectionType === 'wifi_connected') {
    connectionElement.classList.add('wifi-connected');
  } else {
    connectionElement.classList.add('wifi-unavailable');
  }
}

// Function to determine the internet connection type
function getConnectionType() {
  // Use appropriate logic to determine the connection type
  // Example: Check if Ethernet is connected
  const isEthernetConnected = true;

  // Example: Check if cellular connection is available and its quality
  const isCellularAvailable = true;
  const cellularSignalQuality = 'good'; // Can be 'none', 'bad', 'low', 'med', 'good', 'best'

  // Example: Check if WiFi is connected
  const isWifiConnected = false;

  // Determine the connection type based on the conditions
  let connectionType = '';
  if (isEthernetConnected) {
    connectionType = 'ethernet';
  } else if (isCellularAvailable) {
    if (cellularSignalQuality === 'none') {
      connectionType = 'cell_none';
    } else if (cellularSignalQuality === 'bad') {
      connectionType = 'cell_bad';
    } else if (cellularSignalQuality === 'low') {
      connectionType = 'cell_low';
    } else if (cellularSignalQuality === 'med') {
      connectionType = 'cell_med';
    } else if (cellularSignalQuality === 'good') {
      connectionType = 'cell_good';
    } else if (cellularSignalQuality === 'best') {
      connectionType = 'cell_best';
    }
  } else if (isWifiConnected) {
    connectionType = 'wifi_connected';
  } else {
    connectionType = 'wifi_unavailable';
  }

  return connectionType;
}

//const connectionType = getConnectionType();
//updateConnectionStatus(connectionType); Removed for maintence

getBatteryInfo();

updateTime();

setInterval(updateTime, 1000);
