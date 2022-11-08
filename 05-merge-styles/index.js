const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');
const styles = path.resolve(__dirname, 'styles');
// const resultPath = path.resolve(__dirname, 'project-dist');
const bundle = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'bundle.css'));

async () => {
  const stylesArr = await fsPromises.readdir(styles, { withFileTypes: true });
  stylesArr.forEach(style => {
    const extName = path.extname(style.name)
    if (style.isFile() && extName === '.css') {
      let readableStream = fs.createReadStream(path.resolve(styles, style.name))
      readableStream.pipe(bundle)
    }
  });
}