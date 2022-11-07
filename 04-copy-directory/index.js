const fs = require('fs');
const path = require('path');
const baseFolder = path.join(__dirname, './files');
const newFolder = path.join(__dirname, './files-copy');

fs.mkdir(newFolder, { recursive: true }, () => {
  fs.promises.readdir(newFolder).then(items => items.forEach(el => {
      fs.unlink(path.join(newFolder, el), err => {
        if (err) {
          console.error(err);
        }
      });
    })).catch((err) => console.error(err));
  fs.promises.readdir(baseFolder, { withFileTypes: true }).then(items => items.forEach(el => {
      if (el.isFile()) {
        fs.promises.copyFile(path.join(baseFolder, el.name), path.join(newFolder, el.name));
      }
    })).catch((err) => console.error(err));
});