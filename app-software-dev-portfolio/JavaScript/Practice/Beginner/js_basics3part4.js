// JavaScript Basics 3: Conditionals & Operators
// Part A: Basic for loop
// Write a loop that counts from 1 to 5 and prints the number each time

for (let i = 1; i <=5 i++) {
        console.log(i);         
}

// Part B: Basic while loop
// Ask the user to enter a password repeatedly until they enter "open"

const readline = require('readline');
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
});

rl.question('Please enter the password: ', function(password) {
        while (password !== 'open') {
                console.log('Incorrect password.');
        console.log('Access granted!');
        rl.close();
        }
});


// Part C: do-while loop
// Ask the user to enter a number at least once
// Continue asking while the number is less than 10


// to be continued....
