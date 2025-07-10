// Java Basics: Nested Callbacks

const readline = require('readline');
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
});

rl.question('What is your name? ', function(name) {
        rl.question('What is your age? ', function(inputAge){
                const age = parseInt(inputAge);
                console.log(`Hello ${name}, you are ${age} years old.`);
                rl.close();
        });
});     
