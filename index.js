import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Run npm install
execSync("npm install", { stdio: "inherit" });

// Execute src/index.js
import(join("file://", __dirname, "src", "index.js")).catch((error) => {
  console.error(error);
});
