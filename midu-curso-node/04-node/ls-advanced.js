const fs = require("node:fs/promises");
const path = require("node:path");
const pcc = require("picocolors");

const folder = process.argv[2] ?? ",";

async function ls(folder) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch {
    console.error(pcc.red(`No se pudo leer: ${folder}`));
    process.exit(1);
  }

  const promiseFiles = files.map(async (file) => {
    const filePath = path.join(folder, file);
    let fileStat;
    try {
      fileStat = await fs.stat(filePath);
    } catch (error) {
      console.error(`No se pudo leer el archivo: ${file}`);
      process.exit(1);
    }

    const isDirectory = fileStat.isDirectory();
    const fileType = isDirectory ? "d" : "f";
    const fileSize = fileStat.size;
    const modifiedAt = fileStat.mtime.toLocaleString();

    return `${fileType} ${pcc.blue("|")} ${pcc.green(
      file.padEnd(20)
    )} ${pcc.blue("|")} ${pcc.yellow(
      fileSize.toString().padStart(10)
    )} ${pcc.blue("|")} ${pcc.yellow(modifiedAt)}`;
  });

  const filesInfo = await Promise.all(promiseFiles);
  pcc.bgBlack;
  filesInfo.forEach((f) => console.log(pcc.green(f)));
}

ls(folder);
