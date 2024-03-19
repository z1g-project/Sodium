// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import Footer from "@components/footer"
// @ts-expect-error stfu
import loadSettings from "@components/modules/settings"
import "../public/assets/css/home.css"
export default function Apps() {
    loadSettings()
    return (
        <div>
            <Nav />
            <h3>Cooking?</h3>
            <Footer />
        </div>
    )
}