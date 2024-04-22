// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import Footer from "@components/footer"
// @ts-expect-error stfu
import { regSW } from "@components/modules/sw"
//import "/public/assets/css/frames.css"
export default function Appframe() {
    return (
        <div>
            <Nav />
            
            <Footer />
        </div>
    )
}
