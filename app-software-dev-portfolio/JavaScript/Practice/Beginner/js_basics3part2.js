// JavaScript Basics 3: Conditionals & Operators
// // This code snippet demonstrates how to use if, else, and else if statements to respond to user input

const readline = require('readline');
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
});

rl.question('What is your favorite color? ', function(color) {
        if (color === 'blue') {
                console.log('cool choice');
        } else if (color === 'red') {
                console.log('BOLD!');
        } else if (color === 'green') {
                console.log('Nature lover!');      
        }
        rl.close();
});
