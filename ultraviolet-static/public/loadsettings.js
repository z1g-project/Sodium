document.addEventListener('DOMContentLoaded', function () {
  // Load and set saved settings
  loadSavedSettings();
});

function loadSavedSettings() {
  // Load Tab Cloak Icon URL
  const tabCloakIconURL = loadSetting('tabCloakIconURL');
  if (tabCloakIconURL) {
    applyTabCloakIcon(tabCloakIconURL);
  }

  // Load Tab Title
  const tabTitle = loadSetting('tabTitle');
  if (tabTitle) {
    applyTabTitle(tabTitle);
  }

  // Other code for loading other settings
}

function applyTabCloakIcon(iconURL) {
  const existingIcon = document.querySelector('link[rel="icon"]');
  if (iconURL) {
    if (existingIcon) {
      existingIcon.href = iconURL;
    } else {
      const newIcon = document.createElement('link');
      newIcon.rel = 'icon';
      newIcon.href = iconURL;
      document.head.appendChild(newIcon);
    }
  } else {
    if (existingIcon) {
      existingIcon.remove();
    }
  }
}

function applyTabTitle(title) {
  const pageTitle = document.querySelector('title');
  if (pageTitle) {
    pageTitle.innerText = title;
  }
}
