// Function to load and apply the saved settings
function loadSavedSettings() {
    // Load and set the title
    const title = localStorage.getItem('websiteTitle');
    if (title) {
      document.title = title;
      const websiteTitleElem = document.getElementById('website-title');
      if (websiteTitleElem) {
        websiteTitleElem.textContent = title;
      }
    }
  
    // Load and set the icon
    const icon = localStorage.getItem('websiteIcon');
    if (icon) {
      const favicon = document.getElementById('favicon');
      if (favicon) {
        favicon.href = icon;
        favicon.setAttribute('type', 'image/png');
      }
    }
  
    // Load and apply the CSS
    const css = localStorage.getItem('websiteCSS');
    const cssSelect = document.getElementById('css-select');
    if (css && cssSelect) {
      cssSelect.value = css;
      applyCSS();
    }
  }
  
  // Function to apply the selected CSS
  function applyCSS() {
    const cssSelect = document.getElementById('css-select');
    const selectedCSS = cssSelect.value;
    const styleSheets = document.getElementsByTagName('link');
  
    for (let i = 0; i < styleSheets.length; i++) {
      const styleSheet = styleSheets[i];
      if (styleSheet.getAttribute('id') === 'custom-css') {
        styleSheet.href = selectedCSS;
      }
    }
  
    const selectedCSSElem = document.getElementById('selected-css');
    if (selectedCSSElem) {
      selectedCSSElem.textContent = selectedCSS;
    }
  
    // Save the selected CSS in localStorage
    localStorage.setItem('websiteCSS', selectedCSS);
  }
  
  // Function to save the website settings
  function saveWebsiteSettings() {
    const titleInput = document.getElementById('title-input');
    const iconInput = document.getElementById('icon-input');
  
    const title = titleInput.value;
    const icon = iconInput.value;
  
    // Set the title and icon in localStorage
    localStorage.setItem('websiteTitle', title);
    localStorage.setItem('websiteIcon', icon);
  
    // Apply the saved settings
    document.title = title;
    const websiteTitleElem = document.getElementById('website-title');
    if (websiteTitleElem) {
      websiteTitleElem.textContent = title;
    }
    const favicon = document.getElementById('favicon');
    if (favicon) {
      favicon.href = icon;
      favicon.setAttribute('type', 'image/png');
    }
  }
  
  // Load the saved settings when the DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    loadSavedSettings();
  });
  