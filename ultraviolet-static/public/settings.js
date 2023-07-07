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

    const betaMode = localStorage.getItem('betaMode');
  const currentURL = window.location.pathname;

  // Check if the beta mode is enabled and the page URL is "/"
  if (betaMode === 'true' && currentURL === '/') {
    // Load the "/beta.html" page instead
    window.location.href = '/beta.html';
    return;
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

    const toggleBeta = document.getElementById('toggle-beta');
  const betaMode = toggleBeta.checked;

  // Save the beta mode in localStorage only if it is checked
  if (betaMode) {
    localStorage.setItem('betaMode', 'true');
  } else {
    localStorage.removeItem('betaMode');
  }
  
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
  
function loadCSS() {
  const cssEditor = document.getElementById('css-editor');
  const savedCSS = localStorage.getItem('websiteCSS');

  if (savedCSS) {
    cssEditor.value = savedCSS;
  } else {
    fetch('ui.css')
      .then(response => response.text())
      .then(css => {
        cssEditor.value = css;
        saveCustomCSS();
      })
      .catch(error => {
        console.error('Error loading CSS:', error);
      });
  }
}

// Function to save the custom CSS
function saveCustomCSS() {
  const cssEditor = document.getElementById('css-editor');
  const customCSS = cssEditor.value;

  // Save the custom CSS in localStorage
  localStorage.setItem('websiteCSS', customCSS);
}

// Load the saved custom CSS or the default CSS when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  loadCSS();
});

// Event listener for the "Save Settings" button
const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', function () {
  saveCustomCSS();
});

document.addEventListener('DOMContentLoaded', function () {
  loadWebsiteSettings();
});