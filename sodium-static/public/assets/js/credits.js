function toggleLicense(license) {
  var licenseContent = document.getElementById(license + '-license');
  licenseContent.style.display = licenseContent.style.display === '' ? 'block' : '';
}

  window.addEventListener('DOMContentLoaded', function() {
    fetch('assets/txt/MIT.txt')
      .then(response => response.text())
      .then(text => {
        var mitLicense = document.getElementById('mit-license');
        mitLicense.textContent = text;
      });
  
    fetch('assets/txt/GNU.txt')
      .then(response => response.text())
      .then(text => {
        var gnuLicense = document.getElementById('gnu-license');
        gnuLicense.textContent = text;
      });
    fetch('assets/txt/credits.txt')
      .then(response => response.text())
      .then(text => {
        var creditsLicense = document.getElementById('credits-license');
        creditsLicense.textContent = text;
    });
  });
  