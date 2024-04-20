// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import Footer from "@components/footer"
import "/public/assets/css/credits.css"
export default function CreditsPage() {
    return (
        <div>
            <Nav />
            <div class="flex-center logo-wrapper header-center">
                <h1>Sodium Credits</h1>
            </div>
            <div>
                <h1 class="centered-heading">Licenses</h1>
                <div class="license">
                    <div class="license-header" onclick="toggleLicense('mit')">MIT License</div>
                    <div class="license-content" id="mit-license"></div>
                </div>
                <div class="license">
                    <div class="license-header" onclick="toggleLicense('gnu')">GNU AFFERO General Public License version 3</div>
                    <div class="license-content" id="gnu-license"></div>
                </div>
            </div>
            <div>
                <h1 class="centered-heading">Credits</h1>
                <div class="license">
                    <div class="license-header" onclick="toggleLicense('credits')">Credits</div>
                    <div class="license-content" id="credits-license"></div>
                </div>
                <div style="display: flex; justify-content: center;">
                    <a href="/faq.html">View the Sodium FAQ</a>
                </div>
                <br />
                <div style="display: flex; justify-content: center;">
                    <a href="/about/">View Sodium Version Info</a>
                </div>
            </div>    
            <Footer />
        </div>
    )
}
