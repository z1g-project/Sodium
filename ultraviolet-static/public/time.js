function updateBatteryStatus() {
  var batteryElement = document.getElementById('battery');
  
  if ('getBattery' in navigator) {
    navigator.getBattery().then(function(battery) {
      if (battery.charging) {
        batteryElement.textContent = 'Charging: ' + Math.floor(battery.level * 100) + '%';
      } else {
        batteryElement.textContent = '';
      }
    });
  } else if ('battery' in navigator) {
    var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
    
    if (battery.charging) {
      batteryElement.textContent = 'Charging: ' + Math.floor(battery.level * 100) + '%';
    } else {
      batteryElement.textContent = '';
    }
  } else {
    batteryElement.textContent = '';
  }
}

function updateTime() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  var timeElement = document.getElementById('time');
  timeElement.textContent = 'Time: ' + hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
}

setInterval(updateBatteryStatus, 1000);
setInterval(updateTime, 1000);
