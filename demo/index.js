const compile = require('../index.js');
const fs = require('fs');

const source = fs.readFileSync(__dirname + '/demo.js').toString();

fs.writeFileSync(__dirname + '/production.js', compile(source), err => {
    if(err) {
        console.error(err);
    } else {
        console.log('Compile successfully! See it in production.js');
    }
})