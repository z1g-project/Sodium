const useProxy = localStorage.getItem('useProxy') === 'true';
const proxyOption = localStorage.getItem('proxyOption');
const pluginUrls = JSON.parse(localStorage.getItem('websitePlugins')) || [];

pluginUrls.forEach(pluginUrl => {
  const script = document.createElement('script');

  if (useProxy) {
    if (proxyOption && proxyOption.toLowerCase() === 'dynamic') {
      script.src = `${window.location.origin}/service/route?url=${pluginUrl}`;
    } else {
      script.src = `${window.location.origin}/uv/service/${Ultraviolet.codec.xor.encode(pluginUrl)}`;
    }
  } else {
    script.src = pluginUrl;
  }

  document.head.appendChild(script);
  console.log(`Plugin injected into the main page: ${pluginUrl}`);
});
