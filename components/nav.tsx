export default function Nav() {
    return (
        <div>
            <div class="second-bar">
                <a href="/" title="Home" class="second-bar-link home-link"></a>
                <a href="/games/" title="Games" class="second-bar-link games-link"></a>
                <a href="/apps/" title="Apps" class="second-bar-link apps-link"></a>
                <a href="/settings/" title="Settings" class="second-bar-link settings-link"></a>
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