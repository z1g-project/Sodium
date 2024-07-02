import { fetch as bFetch } from "./fetch";

export default async function populateAddons() {
    const addons = await bFetch('https://api.z1g.top/api/plugins', { wisp: true })
    // @ts-expect-error stfu
    const addonCategory: HTMLSelectElement = document.getElementById('addon-category');
    // @ts-expect-error stfu
    const addonSearch: HTMLInputElement = document.getElementById('addon-search');
    // @ts-expect-error stfu
    const addonGrid: HTMLDivElement = document.querySelector('.addon-grid');
    addonGrid.innerHTML = '';
    const selectedCategory = addonCategory.value;
    const searchQuery = addonSearch.value.toLowerCase();
    // @ts-expect-error stfu
    const filteredAddons = addons.filter(addon => {
    const matchCategory = selectedCategory === 'all' || addon.category === selectedCategory;
    const matchSearch = addon.name.toLowerCase().includes(searchQuery) || addon.description.toLowerCase().includes(searchQuery);
        return matchCategory && matchSearch;
    });
    // @ts-expect-error stfu
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
            // @ts-expect-error stfu
            const addonUrl: string = button.getAttribute('data-url');
            if (addonType === 'themes') {
                localStorage.setItem('websiteCSS', addonUrl);
                console.log('Theme downloaded:', addonUrl);
                // @ts-expect-error stfu
                this.addCache(addonUrl)
                // @ts-expect-error stfu
                const notification: HTMLDivElement = document.getElementById('notification');
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
                // @ts-ignore
                let websitePlugins = JSON.parse(localStorage.getItem('websitePlugins')) || [];
                websitePlugins.push(addonUrl);
                localStorage.setItem('websitePlugins', JSON.stringify(websitePlugins));
                console.log('Plugin downloaded:', addonUrl);
                // @ts-expect-error stfu
                const notification: HTMLDivElement = document.getElementById('notification');
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
                // @ts-expect-error stfu
                const notification: HTMLDivElement = document.getElementById('notification');
                notification.textContent = 'Theme Removed';
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
                // @ts-ignore
                let websitePlugins = JSON.parse(localStorage.getItem('websitePlugins')) || [];
                // @ts-expect-error
                websitePlugins = websitePlugins.filter(pluginUrl => pluginUrl !== addonUrl);
                localStorage.setItem('websitePlugins', JSON.stringify(websitePlugins));
                console.log('Plugin uninstalled:', addonUrl);
                // @ts-expect-error stfu
                const notification: HTMLDivElement = document.getElementById('notification');
                    notification.textContent = 'Plugin removed Successfully!';
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
    }

    // @ts-expect-error stfu
    const e1: HTMLSelectElement = document.getElementById('addon-category')
    // @ts-expect-error stfu
    const e2: HTMLInputElement = document.getElementById('addon-search')
    if (e1) {
        e1.addEventListener('change', populateAddons);
    }
    if (e2) {
        e2.addEventListener('input', populateAddons);
    }

    export function addCache(addonUrl: string) {
        // @ts-ignore
        navigator.serviceWorker.register(swscript)
    }
    
    function swscript() {
        self.addEventListener('install', (event) => {
            // @ts-expect-error stfu
            event.waitUntil(
                caches.open('ext-cache').then((cache) => {
                    const cachePaths = [];
                    // @ts-expect-error stfu
                    cachePaths.push(addonUrl);
                    return cache.addAll(cachePaths);
                })
            );
        });
        self.addEventListener('fetch', (event) => {
            // @ts-expect-error stfu
            event.respondWith(
                // @ts-expect-error stfu
                caches.match(event.request).then((response) => {
                    // @ts-expect-error stfu
                    return response || fetch(event.request).catch((error) => {
                        // @ts-expect-error stfu
                        console.error(`Error: Couldn't fetch ${event.request.url} | ${error}`);
                    });
                })
            );
        }); 
    }