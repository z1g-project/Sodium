const addons = [
    {
        name: 'DuoPower for Sodium',
        category: 'plugins',
        description: 'School Blocked Tampermonkey? No Sweat use DuoPower on Sodium!',
        publisher: '✅ Sodium Addons',
        url: 'https://cdn.z1g-project.repl.co/sodium/plugins/duopower.js',
      },
      {
        name: 'Galaxy Theme',
        category: 'themes',
        description: 'A sleek galaxy theme for sodium!',
        publisher: 'Playingallday383',
        url: 'https://cdn.z1g-project.repl.co/sodium/themes/galaxy.css',
      },
  ];
  
  function populateAddons() {
    const addonCategory = document.getElementById('addon-category');
    const addonSearch = document.getElementById('addon-search');
    const addonGrid = document.querySelector('.addon-grid');
  
    addonGrid.innerHTML = '';
  
    const selectedCategory = addonCategory.value;
    const searchQuery = addonSearch.value.toLowerCase();
  
    const filteredAddons = addons.filter(addon => {
      const matchCategory = selectedCategory === 'all' || addon.category === selectedCategory;
      const matchSearch = addon.name.toLowerCase().includes(searchQuery) ||
                         addon.description.toLowerCase().includes(searchQuery);
      return matchCategory && matchSearch;
    });
  
    filteredAddons.forEach(addon => {
      const addonHtml = `
        <div class="addon-item">
          <h3>${addon.name}</h3>
          <p>${addon.description}</p>
          <p class="addon-publisher">By: ${addon.publisher}</p>
          <button class="download-button" data-type="${addon.category}" data-url="${addon.url}">Download</button>
          <button class="uninstall-button" data-type="${addon.category}" data-url="${addon.url}">Uninstall</button>
        </div>
      `;
      addonGrid.insertAdjacentHTML('beforeend', addonHtml);
    });
  
    const downloadButtons = document.querySelectorAll('.download-button');
    downloadButtons.forEach(button => {
      button.addEventListener('click', () => {
        const addonType = button.getAttribute('data-type');
        const addonUrl = button.getAttribute('data-url');
  
        if (addonType === 'themes') {
          localStorage.setItem('websiteCSS', addonUrl);
          console.log('Theme downloaded:', addonUrl);
        } else if (addonType === 'plugins') {
          let websitePlugins = JSON.parse(localStorage.getItem('websitePlugins')) || [];
          websitePlugins.push(addonUrl);
          localStorage.setItem('websitePlugins', JSON.stringify(websitePlugins));
          console.log('Plugin downloaded:', addonUrl);
        }
      });
    });

    const uninstallButtons = document.querySelectorAll('.uninstall-button');
    uninstallButtons.forEach(button => {
      button.addEventListener('click', () => {
        const addonType = button.getAttribute('data-type');
        const addonUrl = button.getAttribute('data-url');
        
        if (addonType === 'themes') {
          localStorage.removeItem('websiteCSS');
          console.log('Theme uninstalled:', addonUrl);
        } else if (addonType === 'plugins') {
          let websitePlugins = JSON.parse(localStorage.getItem('websitePlugins')) || [];
          websitePlugins = websitePlugins.filter(pluginUrl => pluginUrl !== addonUrl);
          localStorage.setItem('websitePlugins', JSON.stringify(websitePlugins));
          console.log('Plugin uninstalled:', addonUrl);
        }
      });
    });   
  }
   
  document.getElementById('addon-category').addEventListener('change', populateAddons);
  document.getElementById('addon-search').addEventListener('input', populateAddons);
  populateAddons();
  