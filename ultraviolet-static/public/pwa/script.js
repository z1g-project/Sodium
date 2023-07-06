let tabCount = 0;

// Set the first tab as active by default
const firstTab = createTab("Sodium", "https://google.com");
firstTab.classList.add('active');

function openNewTab() {
  tabCount++;
  const tabTitle = `Sodium ${tabCount}`;
  const tabContent = `page${tabCount}.html`;
  const newTab = createTab(tabTitle, tabContent);
  newTab.classList.add('active');
}

function createTab(title, contentUrl) {
  const tabList = document.querySelector('.tab-list');
  const newTab = document.createElement('button');
  newTab.classList.add('tab');
  newTab.innerHTML = `
    ${title}
    <span class="tab-close" onclick="closeTab(event)">&#10005;</span>
  `;
  tabList.appendChild(newTab);

  const tabContent = document.querySelector('.tab-pane');
  const iframe = document.createElement('iframe');
  iframe.src = contentUrl;
  iframe.frameBorder = 0;
  tabContent.appendChild(iframe);

  return newTab;
}

function closeTab(event) {
  const tab = event.target.closest('.tab');
  const tabContent = document.querySelector('.tab-pane');
  const iframe = tabContent.querySelector('iframe');
  
  if (tab.classList.contains('active')) {
    const nextTab = tab.nextElementSibling || tab.previousElementSibling;
    // Make the next tab active if available
    if (nextTab) {
      nextTab.classList.add('active');
      iframe.src = nextTab.getAttribute('data-url');
    }
  }

  tab.remove();
  iframe.remove();
}
