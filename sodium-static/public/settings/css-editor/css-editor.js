function escapeHTML(css) {
  return css.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function applyCustomCSS() {
  const cssEditor = monaco.editor.getModels()[0];
  const customCSS = cssEditor.getValue();

  const styleSheet = document.getElementById('custom-css');
  if (styleSheet) {
    styleSheet.textContent = customCSS;
  } else {
    const newStyleSheet = document.createElement('style');
    newStyleSheet.id = 'custom-css';
    newStyleSheet.textContent = customCSS;

    const existingStyleSheet = document.getElementById('custom-css');
    if (existingStyleSheet) {
      existingStyleSheet.parentNode.removeChild(existingStyleSheet);
    }

    document.head.appendChild(newStyleSheet);
  }

  cssEditor.setValue(escapeHTML(customCSS));

  localStorage.setItem('websiteCSS', customCSS);
}

document.addEventListener('DOMContentLoaded', function() {
  const editor = monaco.editor.create(document.getElementById('css-editor'), {
    value: '',
    language: 'css',
    theme: 'vs-dark'
  });

  loadSavedCSS();

  const applyButton = document.getElementById('apply-button');
  applyButton.addEventListener('click', function () {
    applyCustomCSS();
  });
});

function loadSavedCSS() {
  const css = localStorage.getItem('websiteCSS');
  if (css) {
    const editor = monaco.editor.getModels()[0];
    editor.setValue(css);
    applyCustomCSS();
  }
}
