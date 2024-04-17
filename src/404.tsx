// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import Footer from "@components/footer"
export default function Notfound() {
    async function regSW() {
        console.log('Waiting on SW Cache to Register...');
        const stockSW = "/sw.js";
        const dynSW = "/dyn.sw.js"
        const swAllowedHostnames = ["localhost", "127.0.0.1"];
        if (
          location.protocol !== "https:" &&
          !swAllowedHostnames.includes(location.hostname)
        )
        throw new Error("Service workers cannot be registered without https.");
        if (!navigator.serviceWorker)
          throw new Error("Your browser doesn't support service workers.");
        await navigator.serviceWorker.register(stockSW, {
          scope: "/sw/",
        });
        await navigator.serviceWorker.register(dynSW, {
          scope: "/service/",
        });
        window.location.reload()
      }
    return (
        <div>
            <Nav />
            <div class="box-error text-center">
                <h1>404 Error</h1>
                <p style="text-align: center;">The requested file was not found on this server!</p>
                <div style="text-align: center;">
                    <button id="uv-register-sw" onclick={regSW()} value="Register service worker">Register Serviceworkers</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}
