const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');
const styles = path.resolve(__dirname, 'styles');
// const resultPath = path.resolve(__dirname, 'project-dist');
const bundle = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'bundle.css'));

async () => {
  const arr = await fsPromises.readdir(styles, { withFileTypes: true });
  arr.forEach(style => {
    const ext = path.extname(style.name);
    if (style.isFile() && ext === '.css') {
      let compiler = fs.createReadStream(path.resolve(styles, style.name));
      compiler.pipe(bundle);
    }
  });
}