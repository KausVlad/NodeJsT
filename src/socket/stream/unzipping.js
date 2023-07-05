const fs = require('fs');
const zlib = require('zlib');
const gzipFilePath = 'book.txt.gz';
const outputFilePath = 'book2.txt';

const gzip = zlib.createGunzip();
const input = fs.createReadStream(gzipFilePath);
const output = fs.createWriteStream(outputFilePath);

input
  .pipe(gzip)
  .pipe(output)
  .on('finish', () => {
    console.log('File decompressed successfully.');
  })
  .on('error', (err) => {
    console.error('Error decompressing file:', err);
  });
