// JavaScript Basics 4: Loops
 

// What do I want the program to do?
// What **inputs** will it take?
// What **steps** need to happen?
// What **output** do I want to see?
// Describe the logic in plain words


// code to check if a number is even or odd
for (let i = 2; i <= 10; i++) {
        if (i % 2 === 0) {
                console.log(i + " is even");
        }
}

const readline = require('readline');
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout 
});

// Added bad input handling
rl.question('What is your age? ', function(inputAge) {
        const age = parseInt(inputAge);
        if (age <13) {
                console.log('You are a child.');
        } else if (age >= 13 && age <19) {
                console.log('You are a teenager.');
        } else 
                console.log('You are an adult.');
        if (isNaN(age)) {
                console.log('Invalid input.');
        }
        rl.close();
});







