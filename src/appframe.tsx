// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import Footer from "@components/footer"
// @ts-expect-error stfu
import { regSW } from "@components/modules/sw"
export default function Appframe() {
    if (window.location.href.includes('/appframe')) {
        const cssthing = document.createElement("link")
        cssthing.href = "/assets/css/frames.css"
        cssthing.type = "stylesheet"
        document.head.appendChild(cssthing)
    }
    return (
        <div>
            <Nav />
            
            <Footer />
        </div>
    )
}
