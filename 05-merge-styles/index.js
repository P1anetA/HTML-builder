const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

const styles = path.resolve(__dirname, 'styles');
const pathToResult = path.resolve(__dirname, 'project-dist', 'bundle.css');

const bundle = fs.createWriteStream(pathToResult);

let newFunc = async () => {
  const arr = await fsPromises.readdir(styles, { withFileTypes: true });
  arr.forEach(style => {
    const ext = path.extname(style.name);
    if (style.isFile() && ext === '.css') {
      let compiler = fs.createReadStream(path.resolve(styles, style.name));
      compiler.pipe(bundle);
    }
  });
};

newFunc();