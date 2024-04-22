// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import Footer from "@components/footer"
// @ts-expect-error stfu
import { regSW } from "@components/modules/sw"
import "/public/assets/css/frames.css"
export default function RuffleFrame() {
    // @ts-expect-error stfu
    window.RufflePlayer = new ruffle || {};
    // @ts-ignore
    window.addEventListener("load", (event: event) => {
        // @ts-expect-error stfu
        const ruffle = window.RufflePlayer.newest();
        const player = ruffle.createPlayer();
        player.style.width = "100%"; player.style.height = "100%";
        // @ts-expect-error stfu
        const container: HTMLDivElement = document.getElementById("container");
        container.appendChild(player);
        const flashgame = sessionStorage.getItem('flashswf')
        player.load({
            url: flashgame,
        });
    });
    return (
        <div>
            <Nav />
            <div id="container"></div>
            <Footer />
        </div>
    )
}
