export default function Nav() {
    function loadPage(page) {
        if (page = 'home') {
            window.location.hash = '#home'
            window.location.reload()
        } else if (page === 'apps') {
            window.location.hash = '#apps'
            window.location.reload()
        } else if (page === 'games') {
            window.location.hash = '#games'
            window.location.reload()
        } else if (page === 'settings') {
            window.location.hash = '#settings'
            window.location.reload()
        }
    }
    return (
        <div>
            <div class="second-bar">
                <p on:click={() => loadPage('home')} title="Home" class="a second-bar-link home-link"></p>
                <p on:click={() => loadPage('games')} title="Games" class="a second-bar-link games-link"></p>
                <p on:click={() => loadPage('apps')} title="Apps" class="a second-bar-link apps-link"></p>
                <p on:click={() => loadPage('settings')} title="Settings" class="a second-bar-link settings-link"></p>
                <div class="info-menu" id="info-menu" style="margin-left: auto">
                    <div class="info-menu-item" id="transferRate"></div>
                    <div class="info-menu-item" id="latency"></div>
                    <div class="info-menu-item" id="fps"></div>
                </div>
                <div class="top-bar-item" id="time"></div>
                <div class="top-bar-item">
                    <div class="battery-icon-container">
                    <div id="battery" class="battery-icon"></div>
                    <div class="battery-fill"></div>
                    <p class="battery-text"></p>
                </div>
            </div>
          </div>
        </div>
    )
}