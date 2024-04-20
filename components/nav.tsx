import runAll from "./modules/time"
export default function Nav() {
    runAll()
    return (
        <div>
            <div class="second-bar">
                <p on:click={() => window.location.href = '/'} title="Home" class="a second-bar-link home-link"></p>
                <p on:click={() => window.location.href = '/games'} title="Games" class="a second-bar-link games-link"></p>
                <p on:click={() => window.location.href = '/apps'} title="Apps" class="a second-bar-link apps-link"></p>
                <p on:click={() => window.location.href = '/settings'} title="Settings" class="a second-bar-link settings-link"></p>
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