var script = document.createElement('script');
script.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
script.setAttribute('async', 'true');
document.head.appendChild(script);

window.googletag = window.googletag || {};
window.googletag.cmd = window.googletag.cmd || [];

window.googletag.cmd.push(function() {
  window.googletag.pubads().setTargeting('ad_container', 'side-rail-ad-container');
  window.googletag.pubads().enableSingleRequest();
  window.googletag.pubads().collapseEmptyDivs();
  window.googletag.enableServices();
});
