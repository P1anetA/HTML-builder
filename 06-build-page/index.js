const fs = require('fs');
const path = require('path');

const pathToStyles = path.resolve(__dirname, 'styles');
const pathToAssets = path.join(__dirname, 'assets');
const pathToTemplate = path.join(__dirname, 'template.html');
const pathToComponents = path.join(__dirname, 'components');
const pathToResult = path.join(__dirname, 'project-dist');
const pathToResultAssets = path.join(pathToResult, 'assets');
const pathToResultStyle = path.resolve(pathToResult, 'style.css');

const stylesBundle = fs.createWriteStream(pathToResultStyle);

fs.mkdir(
  pathToResult,
  {recursive: true},
  (err) => {
    if (err) throw console.error(err);
  }
)

const copyFolder = async (from, to) => {
  try {
    await fs.promises.mkdir(to, { recursive: true });
    const contents = await fs.promises.readdir(from, { withFileTypes: true });
    contents.forEach(el => {
      if (el.isDirectory()) {
        copyFolder(path.join(from, el.name), path.join(to, el.name));
      } else {
        fs.promises.copyFile(path.join(from, el.name), path.join(to, el.name));
      }
    });
  } catch (err) {
    console.error(err);
  }
}

copyFolder(pathToAssets, pathToResultAssets);

const styleCompiler = async () => {
  try {
  const arr = await fs.promises.readdir(pathToStyles, { withFileTypes: true });
  arr.forEach(style => {
    const ext = path.extname(style.name);
    if (style.isFile() && ext === '.css') {
      let compiler = fs.createReadStream(path.resolve(pathToStyles, style.name));
      compiler.pipe(stylesBundle);
    }
  });
  } catch (err) {
    console.error(err);
  }
};

styleCompiler();

const createHTML = async () => {
  try {
    const file = await fs.promises.readFile(pathToTemplate);
    let fileContent = file.toString();
    const componentsFiles = await fs.promises.readdir(pathToComponents, { withFileTypes: true });
    let arr = componentsFiles.map((file) => file.name);

    arr.filter((name) => fileContent.includes(`{{${name.replace('.html', '')}}}`));
    for await (const el of arr) {
      const elTitle = el.replace('.html', '');
      const elContent = await fs.promises.readFile(path.join(pathToComponents, el));
      fileContent = fileContent.replace(
        `{{${elTitle}}}`,
        elContent.toString()
      );
    }
    await fs.promises.writeFile(
      path.join(pathToResult, 'index.html'),
      fileContent
    );
  } catch (err) {
    console.log(err);
  }
}

createHTML();