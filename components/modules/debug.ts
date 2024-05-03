import { version as ver } from "../../package.json"
export default async function logDebug() {
  const websiteURL = window.location.origin;
  const userAgent = navigator.userAgent;
  const latestVersion = ver;
  const debugMessage = `
Hey there! If you are having any problems, Feel free to create a new GitHub issue or tell us in our Discord Server. Links for these can be found at the footer of the page.
Debug Information:
  - Website URL: ${websiteURL}
  - User Agent: ${userAgent}
  - Sodium Version: ${latestVersion}
        `;
  console.log(debugMessage);
}
  