"use strict";

const tabsContainer = document.querySelector(".tabs");
const browserIframe = document.getElementById("browser-iframe");

function activateTab(tab) {
  const activeTab = tabsContainer.querySelector(".tab.active");
  if (activeTab) activeTab.classList.remove("active");

  tab.classList.add("active");
}

function navigateToUrl(url, title) {
  const encodedURL = Ultraviolet.codec.xor.encode(url);
  const iframeSrc = `${window.location.origin}/uv/service/${encodedURL}`;
  browserIframe.src = iframeSrc;
  document.title = title;

  // Calculate transfer rate, latency, and update metrics
  const transferRate = calculateTransferRate();
  const latency = calculateLatency();
  updateInfoMenuItem('transferRate', `Transfer Rate: ${transferRate}`);
  updateInfoMenuItem('latency', `Latency: ${latency}`);
}

tabsContainer.addEventListener("click", (event) => {
  const tab = event.target.closest(".tab");
  if (tab) {
    const url = tab.dataset.url;
    const title = tab.textContent.trim();
    activateTab(tab);
    navigateToUrl(url, title);
  }
});

document.getElementById("go-button").addEventListener("click", () => {
  const addressBar = document.getElementById("address-bar");
  const url = addressBar.value;
  const tabTemplate = `
    <div class="tab" data-url="${url}">
      ${url}
    </div>`;
  const tab = document.createElement("div");
  tab.innerHTML = tabTemplate.trim();
  activateTab(tab.firstChild);
  navigateToUrl(url, url);
  tabsContainer.appendChild(tab.firstChild);
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

function calculateTransferRate() {
  if (totalBytes > 0 && totalTime > 0) {
    const transferRate = (totalBytes / totalTime) * 8 / 1000; // Kilobits per second
    const transferRateFormatted = transferRate.toFixed(2);
    const transferRateDisplay = `${transferRateFormatted} kbps`;
    return transferRateDisplay;
  } else {
    return 'N/A';
  }
}

function calculateLatency() {
  const latency = performance.timing.responseStart - performance.timing.requestStart;
  return `${latency} ms`;
}

function updateInfoMenuItem(itemId, content) {
  const infoMenuItem = document.getElementById(itemId);
  if (infoMenuItem) {
    infoMenuItem.textContent = content;
  }
}

let fps = 0;
let frameCount = 0;
let lastTime = performance.now();

function updateFPS() {
  const currentTime = performance.now();
  const deltaTime = currentTime - lastTime;
  frameCount++;

  // Calculate FPS every second
  if (deltaTime >= 1000) {
    fps = Math.round((frameCount * 1000) / deltaTime);
    frameCount = 0;
    lastTime = currentTime;
  }

  // Update FPS display
  updateInfoMenuItem('fps', `FPS: ${fps}`);

  // Call the next frame
  requestAnimationFrame(updateFPS);
}

// Start the FPS tracking
updateFPS();
