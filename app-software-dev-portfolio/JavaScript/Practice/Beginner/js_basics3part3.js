// JavaScript Basics 3: Conditionals & Operators
// This code snippet demonstrates how to use a switch statement to respond to user input

const readline = require('readline');
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
});

rl.question('What is your favorite color? ', function(color) {
        switch (color.toLowerCase) {
                case 'blue':
                        console.log('Cool choice!');
                        break;
                case 'red':
                        console.log('BOLD!');
                        break;
                case 'green':
                        console.log('Nature lover!');
                        break;
                default:
                        console.log('That\'s an interesting color choice!');
        }
        rl.close();
});