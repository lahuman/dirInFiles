const fs = require('fs');
const glob = require('glob');
const path = require("path");
const cliProgress = require('cli-progress');
const { md5Lite } = require('md5-lite');


const fileInfos = {};
const reduplication = [];
const searchPahth = process.argv[2];
if (!searchPahth) {

    console.log("usage : node index.js {searchpath}{searchFileType}");
    console.log("node index.js ./searchPath/**/*.txt");

    return;
}


var hrstart = process.hrtime()

console.log("SEARCHING FILES.....");
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

glob(searchPahth, { nodir: true, mark: true, realpath: true }, function (er, files) {
    bar1.start(files.length, 0);

    files.forEach((f, idx) => {
        bar1.update(idx + 1);
        const file = path.basename(f);
        const hash = md5Lite(f);

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

    bar1.stop();
    if (reduplication.length === 0) {
        console.log('No duplicate files!');
    } else {
        const fileName = new Date().getTime() + ".json";
        console.log('REDUPLICATION FILES COUNT : ' + reduplication.length);
        console.log('RESULT FILE PATH : ./' + fileName);
        fs.writeFileSync(fileName, JSON.stringify(reduplication, null, 4));
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