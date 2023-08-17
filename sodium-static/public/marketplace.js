document.addEventListener('DOMContentLoaded', () => {
    const submissionForm = document.getElementById('addon-submission-form');
  
    submissionForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const formData = new FormData(submissionForm);
  
      const newAddon = {
        name: formData.get('addonName'),
        category: formData.get('addonCategory'),
        description: formData.get('addonDescription'),
        downloadLink: formData.get('addonDownloadLink')
      };
  
      fetch('addons.json')
        .then(response => response.json())
        .then(data => {
          data.addons.push(newAddon);
  
          fetch('addons.json', {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(() => {
              alert('Addon submitted successfully!');
              submissionForm.reset();
            })
            .catch(error => {
              console.error('Error submitting addon:', error);
              alert('An error occurred while submitting the addon. Please try again.');
            });
        });
    });
  });
  