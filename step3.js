const fs = require('fs');
const argv = process.argv;
const axios = require('axios');


function output(txt, out) {
    if (out) {
        fs.writeFile(out, txt, 'utf8', err => {
            if (err) {
                console.log(`Error writing ${out}: ${err}`);
                process.exit(1);
            }
        })
    } else {
        console.log(txt);
    }
}


function cat(txtFile, out) {
    fs.readFile(txtFile, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${txtFile}: ${err}`);
            process.exit(1)
        } else {
            output(data, out)
        }
    })
}


async function webCat(url, out) {
    try {
        let res = await axios.get(url);
        output(res.data, out)
    } catch (err) {
        console.log(`Error reaching ${url}: ${err}`);
        process.exit(1);
    }
}


let path;
let out;

if (argv[2] === '--out') {
    out = argv[3];
    path = argv[4];
} else {
    path = argv[2];
}


if (path.slice(0, 4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
}