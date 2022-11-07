const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, { withFileTypes: true }, (err, items) => {
  if (!err) {
    items.forEach(el => {
      if (el.isFile()) {
        fs.stat(path.join(folder, el.name), (err, stat) => {
          if (!err) {
            let names = path.parse(path.join(folder, el.name)).name;
            let extension = path.extname(path.join(folder, el.name)).slice(1);
            let size = stat.size;
            console.log(names + ' - ' + extension + ' - ' + size + ' bytes');
          }
        })
      }
    })
  }
}
)