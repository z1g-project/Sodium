// Function to get the value of a cookie by name
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

// Function to set the value of a cookie
function setCookie(name, value, expirationDays = 365, path = '/') {
  const date = new Date();
  date.setDate(date.getDate() + expirationDays);
  const expires = date.toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=${path}`;
}

// Function to load and apply the saved settings
function loadSavedSettings() {
  // Load and set the title
  const title = getCookie('websiteTitle');
  if (title) {
    document.title = title;
    const websiteTitleElem = document.getElementById('website-title');
    if (websiteTitleElem) {
      websiteTitleElem.textContent = title;
    }
  }

  // Load and set the icon
  const icon = getCookie('websiteIcon');
  if (icon) {
    const favicon = document.getElementById('favicon');
    if (favicon) {
      favicon.href = icon;
      favicon.setAttribute('type', 'image/png');
    }
  }
}

// Function to save the website settings
function saveWebsiteSettings() {
  const titleInput = document.getElementById('title-input');
  const iconInput = document.getElementById('icon-input');

  const title = titleInput.value;
  const icon = iconInput.value;

  // Set the title and icon as cookies
  setCookie('websiteTitle', title);
  setCookie('websiteIcon', icon);

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
