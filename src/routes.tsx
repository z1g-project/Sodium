import { Route } from "dreamland-router"; 
import Notfound from "./404";
import Settings from "./settings";
import Apps from "./apps";
import NoSW from "./proxy-invalid";
import WispBG from "./wisp";
import CreditsPage from "./credits";
import About from "./about";
import Games from "./games"
import Home from "./main"
import Appframe from "./appframe";
import StealthLoader from "./stealth";
import Iframe from "./iframe";
import sLoad from "./load";

export const router = (
    <Route path="/">
        <Route path="" show={<Home />} />
        <Route path="apps" show={<Apps />} />
        <Route path="sw" show={<NoSW />} />
        <Route path="service" show={<NoSW />} />
        <Route path="wisp" show={<WispBG />} />
        <Route path="games" show={<Games />} />
        <Route path="load" show={<sLoad />} />
        <Route path="stealth" show={<StealthLoader />} />
        <Route path="settings" show={<Settings />} />
        <Route path="credits" show={<CreditsPage />} />
        <Route path="about" show={<About />} />
        <Route path="appframe" show={<Appframe />} />
        <Route path="iframe" show={<Iframe />} />
        <Route regex path=".*" show={<Notfound />} />
    </Route>
).$
  
router.render(document.querySelector('.app'));