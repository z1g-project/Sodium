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

  const openNewWindow = localStorage.getItem('openNewWindow');
  if (openNewWindow === 'true' && currentURL === '/') {
    // Open the about:blank page in a new window
    window.open('about:blank', '_blank');
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

  const toggleAboutBlank = document.getElementById('toggle-about-blank');
  const aboutBlankMode = toggleAboutBlank.checked;

  // Save the about:blank mode in localStorage only if it is checked
  if (aboutBlankMode) {
    localStorage.setItem('openNewWindow', 'true');
  } else {
    localStorage.removeItem('openNewWindow');
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
  checkOpenNewWindow();
});

function checkOpenNewWindow() {
  const openNewWindow = localStorage.getItem('openNewWindow');

  if (openNewWindow === 'true' && window.location.pathname === '/') {
    const newWindow = window.open('about:blank', '_blank');
    const iframe = document.createElement('iframe');
    iframe.src = '/';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    newWindow.document.body.appendChild(iframe);
    window.location.href = 'https://www.google.com';
  }
}

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

// Function to handle the toggle about:blank checkbox
function handleToggleAboutBlank() {
  const toggleAboutBlank = document.getElementById('toggle-about-blank');

  if (toggleAboutBlank.checked) {
    // Set the state in localStorage to indicate about:blank mode
    localStorage.setItem('openNewWindow', 'true');
  } else {
    // Remove the state from localStorage
    localStorage.removeItem('openNewWindow');
  }
}

// Event listener for the "Toggle about:blank" checkbox
const toggleAboutBlank = document.getElementById('toggle-about-blank');
toggleAboutBlank.addEventListener('change', function () {
  handleToggleAboutBlank();
});

// Event listener for the "Save Settings" button
const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', function () {
  saveWebsiteSettings();
  handleToggleAboutBlank();

  // Reload the page to apply the settings
  window.location.reload();
});

document.addEventListener('DOMContentLoaded', function () {
  loadCSS();
});
