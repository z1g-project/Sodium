window.addEventListener('DOMContentLoaded', () => {
  const iframe = document.getElementById('apploader');
  const infoMenu = document.getElementById('info-menu');
  const transferRateItem = document.getElementById('transferRate');
  const latencyItem = document.getElementById('latency');

  iframe.addEventListener('load', () => {
    infoMenu.style.display = 'block';
    calculateTransferRate(iframe.src, transferRate => {
      transferRateItem.textContent = `Transfer Rate: ${transferRate}`;
    });
    calculateLatency(iframe.src, latency => {
      latencyItem.textContent = `Latency: ${latency}`;
    });
  });

  let totalBytes = 0;
  let totalTime = 0;

  function trackTransfer(bytesTransferred) {
    totalBytes += bytesTransferred;
    const currentTime = performance.now();
    if (totalTime === 0) {
      totalTime = currentTime;
    } else {
      totalTime = currentTime - totalTime;
    }
  }

  function simulateTransfer() {
    // Simulating a transfer of 2 MB over 5 seconds
    const bytesToTransfer = 2 * 1024 * 1024; // 2 MB
    const transferInterval = 5000; // 5 seconds

    const transferChunks = Math.ceil(bytesToTransfer / 100);
    const chunkSize = Math.ceil(bytesToTransfer / transferChunks);

    let transferredBytes = 0;
    let chunkCount = 0;

    const transferIntervalId = setInterval(() => {
      const remainingBytes = bytesToTransfer - transferredBytes;
      const chunkBytes = Math.min(chunkSize, remainingBytes);

      trackTransfer(chunkBytes);

      transferredBytes += chunkBytes;
      chunkCount++;

      if (chunkCount === transferChunks) {
        clearInterval(transferIntervalId);
        console.log('Transfer complete!');
      }
    }, transferInterval / transferChunks);
  }

  simulateTransfer();

  function calculateTransferRate(url, callback) {
    if (totalBytes > 0 && totalTime > 0) {
      const transferRate = (totalBytes / totalTime) * 8 / 1000; // Kilobits per second
      const transferRateFormatted = transferRate.toFixed(2);
      callback(`${transferRateFormatted} kbps`);
    } else {
      callback('N/A');
    }
  }

  function calculateLatency(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', url, true);

    xhr.onload = () => {
      const latency = xhr.getResponseHeader('x-request-start');
      callback(`${latency} ms`);
    };

    xhr.send();
  }

  function calculateFPS() {
    return 'N/A';
  }

  function updateInfoMenuItem(itemId, content) {
    const infoMenuItem = document.getElementById(itemId);
    if (infoMenuItem) {
      infoMenuItem.textContent = content;
    }
  }

  const transferRate = calculateTransferRate(iframe.src);
  const latency = calculateLatency(iframe.src);
  const fps = calculateFPS();

  updateInfoMenuItem('transferRate', `Transfer Rate: ${transferRate}`);
  updateInfoMenuItem('latency', `Latency: ${latency}`);
  updateInfoMenuItem('fps', `FPS: ${fps}`);
});
