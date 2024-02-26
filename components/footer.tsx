export default function () {
    return (
        <div>
            <div id="footer" class="fullwidth">
                <div class="footerflex">
                <div class="footerbrand">
                    <h3><a href="/">Sodium</a></h3>
                    <p>Evading Internet Censorship for over 6 Months!</p>
                </div>
                <div class="footerlist">
                    <p style="margin-top: 58px;">Sodium © z1g Project 2024</p>
                </div>
            </div>
            <div class="footersocials">
                <img src="assets/img/z1g.png" alt="z1g Project" title="The z1g Project GitHub organization" height="30" width="30" on:click="location.href='/github/z1g-project/'"></img>
                <img src="assets/img/discord.jpg" alt="Discord" title="The z1g Project Discord" height="30" width="30" on:click="location.href='/discord/'"></img>
                <img src="assets/img/github.png" alt="GitHub" title="The official deployment repository for Sodium" height="30" width="30" on:click="location.href='/github/'"></img>
                <img src="assets/img/license.svg" alt="Credits" title="License information" height="30" width="30" on:click="location.href='/credits/'"></img>  
            </div>
          </div>
        </div>
    )
}