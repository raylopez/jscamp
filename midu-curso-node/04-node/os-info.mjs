const os = require('node:os');

console.log(os.platform());
console.log(os.release());
console.log(os.arch());
console.log(os.cpus().length);
console.log(os.uptime() / 60 /60);