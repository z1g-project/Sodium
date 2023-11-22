import { createBareServer } from "@tomphttp/bare-server-node";
import express from "express";
import { createServer } from "node:http";
import { publicPath } from "ultraviolet-static";
import { join } from "node:path";
import { hostname } from "node:os";
import fs from 'fs';
import ip from 'ip';

const barePaths = ["/bare1/", "/bare2/", "/bare3/"];
const bareServers = barePaths.map((path) => createBareServer(path));

const app = express();

app.use(express.static(publicPath));

app.use((req, res) => {
  res.status(404);
  res.sendFile(join(publicPath, "404.html"));
});

const server = createServer();

server.on("request", (req, res) => {
  const matchedBare = bareServers.find((bare) => bare.shouldRoute(req));
  if (matchedBare) {
    matchedBare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  const matchedBare = bareServers.find((bare) => bare.shouldRoute(req));
  if (matchedBare) {
    matchedBare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8080;

server.on("listening", async () => {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const localVersion = packageJson.version;
    const versionTxt = fs.readFileSync('./sodium-static/public/version.txt', 'utf8').trim();

    if (localVersion !== versionTxt) {
      console.log('\x1b[32m[Sodium] Update is available ' + versionTxt + '. Check the GitHub for more info.\x1b[0m');
      startServer();
    } else {
      console.log('\x1b[32m[Sodium] Your up to date!\x1b[0m');
      startServer();
    }
  } catch (error) {
    console.error('\x1b[31mError checking for updates:', error, '\x1b[0m');
    startServer();
  }
});

function startServer() { 
  const address = server.address();
  const ipAddress = ip.address();
  console.log("Sodium is running on:");
  console.log(`\thttp://localhost:${address.port}`);
  console.log(`\thttp://${hostname()}:${address.port}`);
  if (address.family === "IPv4") {
    console.log(`\thttp://${ipAddress}:${address.port}`);
  } else {
    console.log(`\thttp://${ipAddress}:${address.port}`);
  }
}

server.listen({
  port,
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close();
  bareServers.forEach((bare) => bare.close());
  process.exit(0);
}
