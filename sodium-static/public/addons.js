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
      {
        name: 'Eruda',
        category: 'plugins',
        description: 'Adds Console Functionality to Sodium!',
        publisher: '✅ Sodium Addons',
        url: 'https://cdn.z1g-project.repl.co/sodium/plugins/eruda.js',
      },
      {
        name: 'DarkMode',
        category: 'plugins',
        description: 'Make all pages dark so your eyes can rejoice!',
        publisher: '✅ Sodium Addons',
        url: 'https://cdn.z1g-project.repl.co/sodium/plugins/darkmode.js',
      },
      {
        name: 'Youtube Downloader',
        category: 'plugins',
        description: 'Youtube Tools All in one local Download mp4, MP3 HIGT QUALITY without external service auto repeat video, skip ads, return dislikes and more',
        publisher: 'MDCM',
        url: 'https://cdn.z1g-project.repl.co/sodium/plugins/yt.js',
      },
      {
        name: 'Bing AI',
        category: 'plugins',
        description: 'Have the ability to use Bing AI lol',
        publisher: 'avd3',
        url: 'https://cdn.z1g-project.repl.co/sodium/plugins/bingai.js',
      },
      {
        name: 'Weird Theme',
        category: 'themes',
        description: 'Why does this exist',
        publisher: 'd8a1',
        url: 'https://cdn.z1g-project.repl.co/sodium/themes/weird.css',
      },
      {
        name: 'The Sodium Night',
        category: 'themes',
        description: 'Sodium lights at night',
        publisher: 'rekeD',
        url: 'https://cdn.z1g-project.repl.co/sodium/themes/sodinight.css',
      },
      {
        name: 'Gmail - Remove "Empty Trash Now" link',
        category: 'plugins',
        description: 'Removes the "Empty Trash Now" link when in the Trash',
        publisher: 'r8d8',
        url: 'https://cdn.z1g-project.repl.co/sodium/plugins/gmailremove.js',
      },
      {
        name: 'Vencord for Sodium',
        category: 'plugins',
        description: 'A Discord client mod',
        publisher: '✅ Vencord',
        url: 'https://cdn.z1g-project.repl.co/sodium/plugins/vencord.js',
      },
      {
        name: 'Paper.io ZOOM HACK - Paperio Hacks',
        category: 'plugins',
        description: 'Paperio Mods Features: Zoom Hack, Unlock All Skins, Change Everything, Auto Turn Bot, FPS paper-io.com',
        publisher: 'GameHackerC',
        url: 'https://cdn.z1g-project.repl.co/sodium/plugins/paperio.js',
      },
      {
        name: 'Bypass All Shortlinks Manual Captchas',
        category: 'plugins',
        description: 'Bypass for Linkvertise',
        publisher: 'Bloggerpemula',
        url: 'https://cdn.z1g-project.repl.co/sodium/plugins/linkvert.js',
      },
      {
        name: 'Spotify Downloader',
        category: 'plugins',
        description: 'Downloads Spotify songs, playlists, and albums as 320kbps MP3. Can also download full playlist or album as ZIP.',
        publisher: 'Zertalious',
        url: 'https://cdn.z1g-project.repl.co/sodium/plugins/spotify.js',
      },
      {
        name: 'TikTok Autoscroll',
        category: 'plugins',
        description: 'Autoscroll videos on tiktok.',
        publisher: '@Masiosare',              
        url: 'https://cdn.z1g-project.repl.co/sodium/plugins/tiktok.js',
      },
      {
        name: 'GPTSearch',
        category: 'plugins',
        description: 'Adds a Search that uses chatGPT to pages',
        publisher: 'Zheng Bang-Bo',              
        url: 'https://cdn.z1g-project.repl.co/sodium/plugins/gptsearch.js',
      },
      {
        name: 'Powerline.io infinite score and length',
        category: 'plugins',
        description: 'Exploits debugging capabilities in the Powerline.io server to grant infinite score and length',
        publisher: 'ww',              
        url: 'https://cdn.z1g-project.repl.co/sodium/plugins/powerlineio.js',
      },
      {
        name: 'Quizlet gravity game cheat',
        category: 'plugins',
        description: 'The correct answer pops up in the browser console and the restart button down left',
        publisher: 'Danielv123',              
        url: 'https://cdn.z1g-project.repl.co/sodium/plugins/quizlet.js',
      },
      {
        name: 'Aternos Minecraft Server Hosting ADBLOCKER',
        category: 'plugins',
        description: 'Great minecraft hosting, but it has adblocker detection, this script automatically destroy antiadblock windows. I would prefer to show a donate button instead of forcing Ads.',
        publisher: 'Lukáš Kovář',              
        url: 'https://cdn.z1g-project.repl.co/sodium/plugins/aternos.js',
      },
      {
        name: 'AdBlocker',
        category: 'plugins',
        description: 'Block ads on webpages (Early Alpha)',
        publisher: '✅ Sodium Addons',
        url: 'https://cdn.z1g-project.repl.co/sodium/plugins/adblock.js',
      },
      {
        name: 'Yohoho.io Cheats',
        category: 'plugins',
        description: 'Cheats for the popular IO game, Yohoho.IO! Press p to change your pet. l to change the pets level, x to change your xp, i to change your island, c to change your character, and o to change your coins.',
        publisher: 'Steviegt6',
        url: 'https://greasyfork.org/scripts/391387-yohoho-io-cheats/code/Yohohoio%20Cheats.user.js',
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
          const notification = document.getElementById('notification');
            notification.textContent = 'Theme Downloaded! Refresh to see Changes';
            notification.classList.remove('hidden');
          
            setTimeout(() => {
              notification.style.top = '40px';
            }, 10);
          
            setTimeout(() => {
              notification.style.top = '-50px';
              setTimeout(() => {
                notification.classList.add('hidden');
              }, 500);
            }, 3000);
        } else if (addonType === 'plugins') {
          let websitePlugins = JSON.parse(localStorage.getItem('websitePlugins')) || [];
          websitePlugins.push(addonUrl);
          localStorage.setItem('websitePlugins', JSON.stringify(websitePlugins));
          console.log('Plugin downloaded:', addonUrl);
            const notification = document.getElementById('notification');
            notification.textContent = 'Plugin Downloaded!';
            notification.classList.remove('hidden');
          
            setTimeout(() => {
              notification.style.top = '40px';
            }, 10);
          
            setTimeout(() => {
              notification.style.top = '-50px';
              setTimeout(() => {
                notification.classList.add('hidden');
              }, 500);
            }, 3000);
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
  