const fs = require('fs');
const glob = require('glob');
const path = require("path");
const md5File = require('md5-file')
const md5 = require('md5');


const fileInfos = {};
const reduplication = [];
const searchPahth = process.argv[2];
if (!searchPahth) {

    console.log("usage : node index.js {searchpath}{searchFileType}");
    console.log("node index.js ./searchPath/**/*.txt");

    return;
}


const FIRST_SIZE = 100000;
var hrstart = process.hrtime()

const liteMd5 = (filePath) => {
    const res = fs.openSync(filePath, 'r');

    let buffer = Buffer.alloc(FIRST_SIZE);
    fs.readSync(res, buffer, 0, FIRST_SIZE, 0,);
    return md5(buffer);
}


glob(searchPahth, { nodir: true, mark: true, realpath: true }, function (er, files) {
// glob("**/*", { nodir: true, mark: true, realpath: true }, function (er, files) {
    console.log("BEGIN SEARCH FILES");
    files.forEach(f => {
        // console.log(f)
        // console.log(fs.lstatSync(f).isDirectory())
        // if(fs.lstatSync(f).isDirectory()) return true;
        const file = path.basename(f);
        
        // const hash = md5File.sync(f);
        const hash = liteMd5(f);

        if (!fileInfos[hash]) {
            fileInfos[hash] = [];
        }

        fileInfos[hash].push({ filepath: f, hash, fileName: file });
    });
    for (let i in fileInfos) {
        if (fileInfos[i].length > 1) {
            reduplication.push(fileInfos[i]);
        }
    }

    if (reduplication.length === 0) {
        console.log('No duplicate files!');
    } else {
        console.log(JSON.stringify(reduplication, null, 4));
    }

    const hrend = process.hrtime(hrstart);
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
});





// print process.argv
// process.argv.forEach(function (val, index, array) {
//     console.log(index + ': ' + val);
// });

// fs.readdir(testFolder, (err, files) => {
//     files.forEach(file => {
//       console.log(file);
//     });
//   });