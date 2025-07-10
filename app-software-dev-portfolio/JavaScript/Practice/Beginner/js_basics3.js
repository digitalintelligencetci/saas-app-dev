// JavaScript Basics 3: Conditionals & Operators
// Part 1: if, else, else if, and switch statements

const readline = require('readline');
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
});

rl.question("Is this a child? ", function(inputAge) {
        const age = parseInt(inputAge);

        if (age < 15) {
                console.log("This is a child.");
        } else if (age >= 15 && age < 20) {
                console.log("This is a teenager.");
        } else if (age >= 20 && age < 65) {
                console.log("This is an adult.");
        }
        else if (age >= 65) {
                console.log("This is a senior citizen.");
        } else {
                console.log("Invalid age input.");
        }
        rl.close();
}
);






