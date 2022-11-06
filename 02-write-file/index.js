const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

fs.writeFile(
  path.join(__dirname, 'mynotes.txt'),
  '',
  (err) => {
      if (err) throw err;
  }
);
stdout.write('Enter text:\n');
stdin.on('data', data => {
  if (data.toString().trim() == 'exit') {
    process.exit();
  } else {
  fs.appendFile(
    path.join(__dirname, 'mynotes.txt'),
    data,
    err => {
      if (err) throw err;
      console.log('File has been changed, continue writhing:');
  }
  )};
});
process.on('exit', () => stdout.write('Goodbye!\n'));