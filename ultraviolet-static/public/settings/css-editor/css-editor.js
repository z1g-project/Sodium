// Function to escape HTML entities in the CSS code
function escapeHTML(css) {
  return css.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function applyCustomCSS() {
  const cssEditor = monaco.editor.getModels()[0];
  const customCSS = cssEditor.getValue();

  const styleSheets = document.getElementsByTagName('link');

  for (let i = 0; i < styleSheets.length; i++) {
    const styleSheet = styleSheets[i];
    if (styleSheet.getAttribute('id') === 'custom-css') {
      styleSheet.href = 'data:text/css;charset=utf-8,' + encodeURIComponent(customCSS);
    }
  }

  // Update the CSS Editor with escaped HTML entities
  cssEditor.setValue(escapeHTML(customCSS));

  // Save the custom CSS in localStorage
  localStorage.setItem('websiteCSS', customCSS);
}

// Event listener for the "Apply" button
const applyButton = document.getElementById('apply-button');
applyButton.addEventListener('click', function () {
  applyCustomCSS();
});

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the Monaco Editor
  const editor = monaco.editor.create(document.getElementById('css-editor'), {
    value: '', // Initial value of the editor
    language: 'css', // Specify the language mode
    theme: 'vs-dark' // Specify the theme (change it as per your preference)
  });

  // Load the default CSS content into the CSS Editor
  loadDefaultCSS();

  // Load the selected CSS into the CSS Editor by default
  loadSelectedCSS();
});

// Function to load the default CSS content into the CSS Editor
function loadDefaultCSS() {
  fetch('ui.css')
    .then(response => response.text())
    .then(css => {
      const editor = monaco.editor.getModels()[0];
      editor.setValue(css);
    })
    .catch(error => {
      console.error('Error loading default CSS:', error);
    });
}

// Function to load the selected CSS into the CSS Editor by default
function loadSelectedCSS() {
  const cssSelect = document.getElementById('css-select');
  const selectedCSS = cssSelect.value;

  fetch(selectedCSS)
    .then(response => response.text())
    .then(css => {
      const editor = monaco.editor.getModels()[0];
      editor.setValue(css);
    })
    .catch(error => {
      console.error('Error loading CSS:', error);
    });
}
