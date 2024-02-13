function createDebugMessage() {
    const websiteURL = window.location.href;
    const userAgent = navigator.userAgent;
  
    fetch('/version.txt')
      .then((response) => response.text())
      .then((latestVersion) => {
        const debugMessage = `
Hey there! If you are having any problems, Feel free to create a new GitHub issue or tell us in our Discord Server. Links for these can be found at the footer of the page.
Debug Information:
  - Website URL: ${websiteURL}
  - User Agent: ${userAgent}
  - Sodium Version: ${latestVersion}
        `;
        console.log(debugMessage);
      })
      .catch((error) => {
        console.error('Error fetching Sodium version:', error);
      });
  }
  
  createDebugMessage();
  