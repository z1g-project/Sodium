window.addEventListener('DOMContentLoaded', () => {
  const iframe = document.getElementById('apploader');
  const infoMenu = document.getElementById('info-menu');
  const transferRateItem = document.getElementById('transferRate');
  const latencyItem = document.getElementById('latency');
  const fpsItem = document.getElementById('fps');

  fpsItem.style.display = 'none';

  function calculateTransferRate(url, callback) {
    if (totalBytes > 0 && totalTime > 0) {
      const transferRate = (totalBytes / totalTime) * 8 / 1000;
      const transferRateFormatted = transferRate.toFixed(2);
      callback(`${transferRateFormatted} kbps`);
    } else {
      callback('N/A');
    }
  }

  function calculateLatency(url, callback) {
    const timing = performance.timing;
    const latency = timing.responseStart - timing.requestStart;
    callback(`${latency} ms`);
  }

  function calculateFPS() {
    let fps = 0;
    let frameCount = 0;
    let lastTime = performance.now();
  
    function updateFPS() {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;
      frameCount++;
  
      if (deltaTime >= 1000) {
        fps = Math.round((frameCount * 1000) / deltaTime);
        frameCount = 0;
        lastTime = currentTime;
      }
  
      fpsItem.textContent = `FPS: ${fps}`;
      requestAnimationFrame(updateFPS);
    }
  
    updateFPS();
  }

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
    const bytesToTransfer = 2 * 1024 * 1024;
    const transferInterval = 5000;

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

  iframe.addEventListener('load', () => {
    infoMenu.style.display = 'block';
    calculateTransferRate(iframe.src, transferRate => {
      transferRateItem.textContent = `Transfer Rate: ${transferRate}`;
    });
    calculateLatency(iframe.src, latency => {
      latencyItem.textContent = `Latency: ${latency}`;
    });
    const fps = calculateFPS();
    fpsItem.textContent = `FPS: ${fps}`;
    fpsItem.style.display = 'block';

    const useProxy = localStorage.getItem('useProxy') === 'true';
    const proxyOption = localStorage.getItem('proxyOption');
    const pluginUrls = JSON.parse(localStorage.getItem('websitePlugins')) || [];
    
    pluginUrls.forEach(pluginUrl => {
      const script = document.createElement('script');
      
      if (useProxy) {
        if (proxyOption && proxyOption.toLowerCase() === "dynamic") {
          script.src = `${window.location.origin}/service/route?url=${(pluginUrl)}`;
        } else {
          script.src = `${window.location.origin}/uv/service/${Ultraviolet.codec.xor.encode(pluginUrl)}`;
        }
      } else {
        script.src = pluginUrl;
      }
      
      const iframeDocument = iframe.contentWindow.document;
      iframeDocument.head.appendChild(script);
      console.log(`Plugin injected into the iframe: ${pluginUrl}`);
    });

    iframe.style.display = "block";
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.style.display = 'none';
  });

  iframe.addEventListener('loadstart', () => {
    iframe.style.display = 'none';
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.style.display = 'flex';
  });
});
