const path = require("node:path");
// barra separadora segun SO
const sep = path.sep;

// Unir rutas
const fullPath = path.join("c", "apps", "angular");
const base = path.basename(
  "c" + sep + "apps" + sep + "angular" + sep + "index.html",
  ".html"
);

const ext = path.extname("index.html");

console.log(ext);
