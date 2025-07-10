// JavaScript Basics 2: Input & Output



const readline = require('readline');
const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
});

rl.question("What's your name? ", function(name) {
        console.log(`Hello, ${name}!`);
rl.close();
});

// Loads the readline module
// Creates an interface to read user input from the terminal
// Asks a question: "What's your name?"
// Waits for the user to type a name and hit Enter
// Prints: Hello, [name]!
// Closes the interface so the program ends

