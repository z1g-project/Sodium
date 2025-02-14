import express from 'express';
import path from 'path';
import fs from 'fs';
import ip from 'ip';
import { hostname } from 'os';
import { server as wisp } from '@mercuryworkshop/wisp-js';
import { publicPath } from 'sodium-static';

const app = express();
app.use(express.static(publicPath));
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(publicPath, '404.html'));
});

app.use((req, res, next) => {
  if (req.url.endsWith("/wisp/")) {
    wisp.routeRequest(req, res);
  } else {
    next();
  }
});

async function updateCheck() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const localVersion = packageJson.version;
    const versionTxt = fs.readFileSync('./sodium-static/public/version.txt', 'utf8').trim();
    if (localVersion !== versionTxt) {
      console.log(`\x1b[32m[Sodium] Update is available: ${versionTxt}. Check the GitHub for more info.\x1b[0m`);
    } else {
      console.log('\x1b[32m[Sodium] Your system is up to date!\x1b[0m');
    }
  } catch (error) {
    console.error('\x1b[31mError checking for updates:', error, '\x1b[0m');
  }
}

function logServerDetails(port) {
  const ipAddress = ip.address();
  console.log('Sodium is running on:');
  console.log(`\thttp://localhost:${port}`);
  console.log(`\thttp://${hostname()}:${port}`);
  console.log(`\thttp://${ipAddress}:${port}`);
}

const port = parseInt(process.env.PORT, 10) || 8080;
app.listen(port, () => {
  updateCheck();
  logServerDetails(port);
});

const shutdown = () => {
  console.log('Goodbye!');
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
