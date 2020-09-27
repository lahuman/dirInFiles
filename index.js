
const fs = require('fs');
const glob = require('glob');
var path = require("path");


const fileInfos = {};

glob("./**/*.js", { mark: true, realpath: true }, function (er, files) {

    files.forEach(f => {
        const file = path.basename(f);
        if (!fileInfos[file]) {
            fileInfos[file] = [];
        }

        fileInfos[file].push({ filepath: f });
    });
    for (let i in fileInfos) {
        if (fileInfos[i].length > 1) {
            console.log(fileInfos[i])
        }
    }
})


// print process.argv
// process.argv.forEach(function (val, index, array) {
//     console.log(index + ': ' + val);
// });

// fs.readdir(testFolder, (err, files) => {
//     files.forEach(file => {
//       console.log(file);
//     });
//   });