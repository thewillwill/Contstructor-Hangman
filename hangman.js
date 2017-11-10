// ------------------------
// Required Packages
// ------------------------

// Load the NPM Package inquirer
var inquirer = require("inquirer");

//load the object (array) of capitals
var Capitals = require("./capitals.js");

//load the word object
var Word = require("./word.js");

//store the current word object
var currentWord;
//store the USA state name to show at the end
var state;



//start the game
playGame();

//==========================================================
// FUNCTIONS
//==========================================================

function playGame() {
    //print welcome text
    console.log("\nWelcome to USA Capital's Hangman. Ready to Fly?\n");
    console.log("       __!__");
    console.log("   _____(_)_____");
    console.log("      !  !  !   ");


    chooseRandomCity();
    chooseLetter();

}


//Pick a random city from the list and store it in a Word Object
//================================
function chooseRandomCity() {
    // pick a random city from array
    randomIndex = Math.floor(Math.random() * Capitals.length);
    var capitalCity = Capitals[randomIndex][0].toLowerCase(); //make chars lower case
    state = Capitals[randomIndex][1] //store the state name to display after round

    //console.log('CITY,', capitalCity, ' state', state);

    //store the capitalCity as a word object made up of letter objects
    currentWord = new Word();

    for (var i = 0; i < capitalCity.length; i++) {
        currentWord.addLetters(capitalCity[i]);
    }
}

//Prompt the user to pick a letter and then process input
//================================
function chooseLetter() {

    inquirer.prompt([{
        name: "letter",
        message: "Pick a letter",
        validate: function(value) {
        	//check for a single letter character
            if (value.length === 1 && value.match(/[a-z]/i)) {
                return true;
            }
            return false;
        }

    }]).then(function(result) {

    	//check if the lowercase version of the letter is in the Word
        currentWord.checkGuess(result.letter.toLowerCase());
        console.log(currentWord.getWord());
        if (currentWord.guesses >= currentWord.maxGuesses) {

            console.log('    Game Over  :-(');
            console.log('You are not going to ', currentWord.toString(), 'the capital of', state);
            playAgainPrompt();
        } else if (currentWord.numCorrectGuesses === currentWord.letters.length-currentWord.numSpaces) {

            console.log('You are off to the capital of', state);
            console.log('            _\\ _~-\\___');
            console.log('    =  = ==(_U WON____D');
            console.log('                \\_____\\___________________,-~~~~~~~`-.._');
            console.log('                /     o O o o o o O O o o o o o o O o  |\\_');
            console.log('                `~-.__        ___..----..                  )');
            console.log('                      `---~~\\___________/------------`````');
            console.log('                      =  ===(_________D');

            playAgainPrompt();
        } else {
            chooseLetter();
        }


    });
}

function playAgainPrompt() {

    inquirer.prompt({
        name: "again",
        type: "confirm",
        message: "Would you like to play another game?"
    }).then(function(answer) {
        if (answer.again === true) {
            // starts new game
            playGame();
        } else {
            console.log("Come back again soon!");
        }
    });
}