const fs = require('fs');
const argv = process.argv;
const axios = require('axios');


function cat(txtFile) {
    fs.readFile(txtFile, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${txtFile}: ${err}`);
            process.exit(1)
        } else {
            console.log("one.txt data: ", data)
        }
    })
}

async function webCat(url) {
    try {
        let res = await axios.get(url);
        console.log(res.data)
    } catch (err) {
        console.log(`Error reaching ${url}: ${err}`);
        process.exit(1);
    }
}

if (argv[2].slice(0, 4) === 'http') {
    webCat(argv[2]);
} else {
    cat(argv[2])
}