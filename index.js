const fs = require('fs');
const glob = require('glob');
const path = require("path");
const md5File = require('md5-file')


const fileInfos = {};
const reduplication = [];
const searchPahth = process.argv[2];
if (!searchPahth) {

    console.log("usage : node index.js {searchpath}{searchFileType}");
    console.log("node index.js ./searchPath/**/*.txt");

    return;
}


glob(searchPahth, {  matchBase: true, nodir: true, mark: true, realpath: true, dot: true }, function (er, files) {
    // console.log(files)
    files.forEach(f => {
        // console.log(f)
        // console.log(fs.lstatSync(f).isDirectory())
        // if(fs.lstatSync(f).isDirectory()) return true;
        const file = path.basename(f);
        const hash = md5File.sync(f);

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