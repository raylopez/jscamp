const fs = require('node:fs/promises');

fs.readFile('./archivo.txt', 'utf-8',).then((err, text) =>{ 
    console.log(text);
});


console.log('hacer cosas');

fs.readFile('./archivo2.txt', 'utf-8')
    .then((err, text2)=> {
        console.log(text2);
    });
