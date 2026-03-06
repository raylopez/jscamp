const fs = require('node:fs');

fs.readFile('./archivo.txt', 'utf-8', (err,text) => {
    console.log(text);
});


console.log('hacer cosas');

fs.readFile('./archivo2.txt', 'utf-8', (err, text2)=> {
    console.log(text2);
});
