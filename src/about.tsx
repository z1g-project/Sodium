// @ts-expect-error stfu
import Nav from "@components/nav.tsx"
// @ts-expect-error stfu
import Footer from "@components/footer"
import { version, release_channel as release } from "../package.json"
import axios from 'axios';
const gitCommit = __GIT_COMMIT__.substring(0, 7);
let commitDate = "Fetching...";
function formatDate(dateString: any) {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    // @ts-expect-error stfu
    return date.toLocaleDateString(undefined, options);
}

axios.get(`https://api.github.com/repos/z1g-project/sodium/commits/${gitCommit}`)
    .then(response => {
        const commitDateISO = response.data.commit.committer.date;
        commitDate = formatDate(commitDateISO);
        const versionInfo = document.getElementById('version-info');
        if (versionInfo) {
            versionInfo.textContent = `Sodium v${version} ${release} (Released on: ${commitDate} Commit ${gitCommit})`;
        }
    })
    .catch(error => {
        console.error('Error fetching commit date:', error);
        commitDate = "Error fetching commit date";
        const versionInfo = document.getElementById('version-info');
        if (versionInfo) {
            versionInfo.textContent = `Sodium v${version} ${release} (Released on: ${commitDate} Commit ${gitCommit})`;
        }
    });

export default function About() {
    return (
        <div>
            <Nav />
            <div title="Sodium Logo" class="flex-center logo-wrapper header-center">
                <img class="logo" src="/assets/img/logo.svg" alt="Sodium" />
                <h1>About Sodium</h1>
            </div>
            <div class="flex-center desc">
                <p>Sodium is a site used for evading internet censorship</p>
            </div>
            <div class="flex-center desc">
                <p id="version-info">
                    Sodium v{version} {release} (Released on: {commitDate} Commit<a href={`https://github.com/z1g-project/Sodium/commit/${gitCommit}`}>{gitCommit}</a>)
                </p>
            </div>
            <div class="flex-center desc">
                <p>Made with ❤️ by XSTARS!</p>
            </div>
            <Footer />
        </div>
    )
}
