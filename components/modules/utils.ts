import { XOR as xor } from "./xor"
export default async function runUtils(sessionCheck: string) {
    // @ts-expect-error stfu
    const iframe: HTMLIFrameElement = document.getElementById('apploader');
    // @ts-expect-error stfu
    const loadingOverlay: HTMLDivElement = document.getElementById('loading-overlay');
    // @ts-expect-error stfu
    const infoMenu: HTMLDivElement = document.getElementById('info-menu');
    // @ts-expect-error stfu
    const transferRateItem: HTMLDivElement = document.getElementById('transferRate');
    // @ts-expect-error stfu
    const latencyItem: HTMLDivElement = document.getElementById('latency');
    // @ts-expect-error stfu
    const fpsItem: HTMLDivElement = document.getElementById('fps');
    const totalBytes = 0;
    const totalTime = 0;
  
    function getTransferRate(url, callback) {
        if (totalBytes > 0 && totalTime > 0) {
            const transferRate = (totalBytes / totalTime) * 8 / 1000;
            const transferRateFormatted = transferRate.toFixed(2);
            callback(`${transferRateFormatted} kbps`);
        } else {
            callback('N/A');
        }
    }
    fpsItem.style.display = 'none';
    if (iframe) {
        const proxyOption = localStorage.getItem("proxyOption");
        const urltoencode = sessionStorage.getItem(sessionCheck);
        console.log(sessionCheck)
        console.log(urltoencode)
        if (proxyOption && proxyOption.toLowerCase() === "dynamic") {
            iframe.src = `${window.location.origin}/service/route?url=${urltoencode}`;
        } else {
            // @ts-expect-error stfu
            const encodedURL = xor.encode(urltoencode.toString);
            iframe.src = `${window.location.origin}/sw/${encodedURL}`;
        }
        iframe.onload = () => {
            loadingOverlay.style.display = 'none';
            // @ts-expect-error stfu
            iframe.parentElement.classList.add('show-iframe');
        };
    }
    function getLatency(url, callback) {
        const timing = performance.timing;
        const latency = timing.responseStart - timing.requestStart;
        callback(`${latency} ms`);
    }
    function getFPS() {
        let fps = 0;
        let frameCount = 0;
        let lastTime = performance.now();
        const currentTime = performance.now();
        const deltaTime = currentTime - lastTime;
        frameCount++;
        if (deltaTime >= 1000) {
          fps = Math.round((frameCount * 1000) / deltaTime);
          frameCount = 0;
          lastTime = currentTime;
        }
        fpsItem.textContent = `FPS: ${fps}`;
    }
    getFPS()
    iframe.addEventListener('load', () => {
        infoMenu.style.display = 'block';
        getTransferRate(iframe.src, transferRate => {
            transferRateItem.textContent = `Transfer Rate: ${transferRate}`;
        });
        getLatency(iframe.src, latency => {
            latencyItem.textContent = `Latency: ${latency}`;
        });
        const fps = getFPS();
        fpsItem.textContent = `FPS: ${fps}`;
        fpsItem.style.display = 'block';
    });
}