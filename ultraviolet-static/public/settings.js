document.addEventListener('DOMContentLoaded', function () {
  // Load and set saved settings
  loadSavedSettings();

  // Add event listeners for save and reset buttons
  document.getElementById('tab-cloak-icon-save-btn').addEventListener('click', saveTabCloakIcon);
  document.getElementById('tab-cloak-icon-reset-btn').addEventListener('click', resetTabCloakIcon);
  document.getElementById('cloak-save-btn').addEventListener('click', saveCloakValue);
  document.getElementById('cloak-reset-btn').addEventListener('click', resetCloakValue);
  document.getElementById('css-modification-save-btn').addEventListener('click', saveCSSModification);
  document.getElementById('css-modification-reset-btn').addEventListener('click', resetCSSModification);
});

function loadSavedSettings() {
  // Load Tab Cloak Icon URL
  const tabCloakIconURL = loadSetting('tabCloakIconURL');
  if (tabCloakIconURL) {
    document.getElementById('tab-cloak-icon-input').value = tabCloakIconURL;
    document.getElementById('tab-cloak-icon-value').textContent = tabCloakIconURL;
    applyTabCloakIcon(tabCloakIconURL);
  }

  // Load Cloak value
  const cloakValue = loadSetting('cloakValue');
  if (cloakValue) {
    document.getElementById('cloak-input').value = cloakValue;
    applyCloakTitle(cloakValue);
  }

  // Load CSS modification
  const cssModification = loadSetting('cssModification');
  if (cssModification) {
    document.getElementById('css-modification-input').value = cssModification;
    applyCSSModification(cssModification);
  }

  function applyCloakTitle(cloakTitle) {
  // Set the Cloak title on all pages
  document.title = cloakTitle || 'Sodium';
  }
}

function applyTabSettings(tabCloakIconURL, tabTitle) {
  // Apply Tab Cloak Icon URL to all pages
  const existingIcon = document.getElementById('custom-tab-cloak-icon');
  if (tabCloakIconURL) {
    if (existingIcon) {
      existingIcon.href = tabCloakIconURL;
    } else {
      const newIcon = document.createElement('link');
      newIcon.id = 'custom-tab-cloak-icon';
      newIcon.rel = 'icon';
      newIcon.href = tabCloakIconURL;
      document.head.appendChild(newIcon);
    }
  } else {
    if (existingIcon) {
      existingIcon.remove();
    }
  }

  // Apply Tab Title to all pages
  const pageTitle = document.querySelector('title');
  if (pageTitle) {
    pageTitle.innerText = tabTitle || 'Sodium';
  }
}

function loadSetting(key) {
  return localStorage.getItem(key);
}

function saveSetting(key, value) {
  localStorage.setItem(key, value);
}

function saveTabCloakIcon() {
  const tabCloakIconURLInput = document.getElementById('tab-cloak-icon-input');
  const newTabCloakIconURL = tabCloakIconURLInput.value;
  saveSetting('tabCloakIconURL', newTabCloakIconURL);
  document.getElementById('tab-cloak-icon-value').textContent = newTabCloakIconURL;
  applyTabCloakIcon(newTabCloakIconURL);
}

function resetTabCloakIcon() {
  const tabCloakIconURLInput = document.getElementById('tab-cloak-icon-input');
  tabCloakIconURLInput.value = '';
  saveSetting('tabCloakIconURL', '');
  document.getElementById('tab-cloak-icon-value').textContent = '';
  applyTabCloakIcon('');
}

function applyTabCloakIcon(iconURL) {
  const existingIcon = document.getElementById('custom-tab-cloak-icon');
  if (iconURL) {
    if (existingIcon) {
      existingIcon.href = iconURL;
    } else {
      const newIcon = document.createElement('link');
      newIcon.id = 'custom-tab-cloak-icon';
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

function saveCloakValue() {
  const cloakValueInput = document.getElementById('cloak-input');
  const newCloakValue = cloakValueInput.value;
  saveSetting('cloakValue', newCloakValue);
}

function resetCloakValue() {
  const cloakValueInput = document.getElementById('cloak-input');
  cloakValueInput.value = '';
  saveSetting('cloakValue', '');
}

function saveCSSModification() {
  const cssModificationInput = document.getElementById('css-modification-input');
  const newCSSModification = cssModificationInput.value;
  saveSetting('cssModification', newCSSModification);
  applyCSSModification(newCSSModification);
}

function resetCSSModification() {
  const cssModificationInput = document.getElementById('css-modification-input');
  cssModificationInput.value = '';
  saveSetting('cssModification', '');
  applyCSSModification('');
}

function applyCSSModification(cssCode) {
  const existingStyleTag = document.getElementById('custom-css-modification');
  if (cssCode) {
    if (existingStyleTag) {
      existingStyleTag.textContent = cssCode;
    } else {
      const newStyleTag = document.createElement('style');
      newStyleTag.id = 'custom-css-modification';
      newStyleTag.textContent = cssCode;
      document.head.appendChild(newStyleTag);
    }
  } else {
    if (existingStyleTag) {
      existingStyleTag.remove();
    }
  }
}
