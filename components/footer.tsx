export default function Footer() {
    return (
        <div>
            <div id="footer" class="fullwidth">
                <div class="footerflex">
                    <div class="footerbrand">
                        <h3><a href="/">Sodium</a></h3>
                        <p>Evading Internet Censorship for almost a year!</p>
                    </div>
                    <div class="footerlist">
                        <p style="margin-top: 58px;">Sodium © z1g Project 2024</p>
                    </div>
                </div>
                <div class="footersocials">
                    <img src="assets/img/z1g.png" alt="z1g Project" title="The z1g Project GitHub organization" height="30" width="30" onclick="location.href='/load?site=gh'"></img>
                    <img src="assets/img/discord.jpg" alt="Discord" title="The z1g Project Discord" height="30" width="30" onclick="location.href='/load?site=discord'"></img>
                    <img src="assets/img/github.png" alt="GitHub" title="The official deployment repository for Sodium" height="30" width="30" onclick="location.href='/load?site=github'"></img>
                    <img src="assets/img/license.svg" alt="Credits" title="License information" height="30" width="30" onclick="location.href='/credits'"></img>  
                </div>
            </div>
        </div>
    )
}

export function AltFooter() {
    return (
        <div>
            <div id="footer" class="fullwidth" style="position: relative; margin-top: 0px; background-repeat: no-repeat; background-size: 100vw auto;">
                <div class="footerflex">
                    <div class="footerbrand">
                        <h3><a href="/">Sodium</a></h3>
                        <p>Evading Internet Censorship for almost a year!</p>
                    </div>
                    <div class="footerlist">
                        <p style="margin-top: 58px;">Sodium © z1g Project 2024</p>
                    </div>
                </div>
                <div class="footersocials">
                    <img src="assets/img/z1g.png" alt="z1g Project" title="The z1g Project GitHub organization" height="30" width="30" onclick="location.href='/load?site=gh'"></img>
                    <img src="assets/img/discord.jpg" alt="Discord" title="The z1g Project Discord" height="30" width="30" onclick="location.href='/load?site=discord'"></img>
                    <img src="assets/img/github.png" alt="GitHub" title="The official deployment repository for Sodium" height="30" width="30" onclick="location.href='/load?site=github'"></img>
                    <img src="assets/img/license.svg" alt="Credits" title="License information" height="30" width="30" onclick="location.href='/credits'"></img>  
                </div>
            </div>
        </div>
    )
}
