export default async function toggleLicense(license: any) {
    const licenseContent = document.getElementById(license + '-license');
    // @ts-ignore
    licenseContent.style.display = licenseContent.style.display === '' ? 'block' : '';
}

export function run() {
    fetch('assets/txt/MIT.txt')
        .then(response => response.text())
        .then(text => {
            const mitLicense = document.getElementById('mit-license');
            // @ts-ignore
            mitLicense.textContent = text;
        });
    
    fetch('assets/txt/GNU.txt')
        .then(response => response.text())
        .then(text => {
            const gnuLicense = document.getElementById('gnu-license');
            // @ts-ignore
            gnuLicense.textContent = text;
        });
    fetch('assets/txt/credits.txt')
        .then(response => response.text())
        .then(text => {
            const creditsLicense = document.getElementById('credits-license');
            // @ts-ignore
            creditsLicense.textContent = text;
    });
}