// Function to escape HTML entities in the CSS code
function escapeHTML(css) {
  return css.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Function to load the selected CSS into the CSS Editor by default
function loadSelectedCSS() {
  const cssSelect = document.getElementById('css-select');
  const selectedCSS = cssSelect.value;

  fetch(selectedCSS)
    .then(response => response.text())
    .then(css => {
      const cssEditor = document.getElementById('css-editor');
      cssEditor.value = css;
    })
    .catch(error => {
      console.error('Error loading CSS:', error);
    });
}

// Function to apply the custom CSS to the website
function applyCustomCSS() {
  const cssEditor = document.getElementById('css-editor');
  const customCSS = cssEditor.value;

  const styleSheets = document.getElementsByTagName('link');

  for (let i = 0; i < styleSheets.length; i++) {
    const styleSheet = styleSheets[i];
    if (styleSheet.getAttribute('id') === 'custom-css') {
      styleSheet.href = 'data:text/css;charset=utf-8,' + encodeURIComponent(customCSS);
    }
  }

  // Update the CSS Editor with escaped HTML entities
  cssEditor.value = escapeHTML(customCSS);
}

// Event listener for the "Apply" button
const applyButton = document.getElementById('apply-button');
applyButton.addEventListener('click', function () {
  applyCustomCSS();
});

// Load the selected CSS into the CSS Editor by default
loadSelectedCSS();
