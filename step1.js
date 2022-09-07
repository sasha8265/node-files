const fs = require('fs');
const argv = process.argv;


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

cat(argv[2])