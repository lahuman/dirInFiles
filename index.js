const fs = require('fs');
const glob = require('glob');
const path = require("path");
const md5File = require('md5-file')
const md5 = require('md5');
const cliProgress = require('cli-progress');



const fileInfos = {};
const reduplication = [];
const searchPahth = process.argv[2];
if (!searchPahth) {

    console.log("usage : node index.js {searchpath}{searchFileType}");
    console.log("node index.js ./searchPath/**/*.txt");

    return;
}


const BUFFER_SIZE = 100000;
var hrstart = process.hrtime()

const liteMd5 = (filePath) => {
    const st = fs.statSync(filePath);
    
    // 대용량의 경우만 처리
    if(st.size > (BUFFER_SIZE*2)){
        let firstBuffer = Buffer.alloc(BUFFER_SIZE);
        let lastBuffer = Buffer.alloc(BUFFER_SIZE);
        const res = fs.openSync(filePath, 'r');
        fs.readSync(res, firstBuffer, 0, BUFFER_SIZE, 0);
        fs.readSync(res, lastBuffer, 0, BUFFER_SIZE, (st.size - BUFFER_SIZE));
        return md5(firstBuffer + lastBuffer);
    }else{
        return md5File.sync(filePath)
    }
}


console.log("BEGIN SEARCH FILES");
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

glob(searchPahth, { nodir: true, mark: true, realpath: true }, function (er, files) {
// glob("**/*", { nodir: true, mark: true, realpath: true }, function (er, files) {
    bar1.start(files.length, 0);

    files.forEach((f,idx) => {
        bar1.update(idx+1);
        const file = path.basename(f);

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

    bar1.stop();
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