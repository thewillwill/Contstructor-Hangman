// ------------------------
// Required Packages
// ------------------------

// Load the NPM Package inquirer
var inquirer = require("inquirer");

var Capitals = require("./capitals.js");
var Word = require("./word.js");
var currentWord;


var capitalCity;
var state;

var wins = 0;
var losses = 0;




console.log("Welcome to Constructor Hangman");
playGame();

//==========================================================
// FUNCTIONS
//==========================================================


function playGame() {
    chooseRandomCity();
    chooseLetter();

}


//Pick a random city from the list
//===================================================
function chooseRandomCity() {
    // pick a random city from array
    randomIndex = Math.floor(Math.random() * Capitals.length);
    capitalCity = Capitals[randomIndex][0].toLowerCase(); //make chars lower case
    state = Capitals[randomIndex][1] //store the state name to display after round

    console.log('capitalCity', capitalCity);

    console.log('state', state)

    //store the capitalCity as a word object made up of letter objects

    currentWord = new Word();

    for (var i = 0; i < capitalCity.length; i++) {
        currentWord.addLetters(capitalCity[i]);
    }

    console.log(currentWord.getWord());

}

function chooseLetter() {

    inquirer.prompt([{
        name: "letter",
        message: "Pick a letter",
        validate: function(value) {
            if (value => 'a' && parseInt(value) <= 'z') {
                return true;
            }
            return false;
        }

    }]).then(function(result) {
        console.log('guesses', currentWord.guesses);

        currentWord.checkGuess(result.letter);
        console.log(currentWord.getWord());
        if (currentWord.guesses >= currentWord.maxGuesses) {
            console.log('too many guesses, game over');
            playAgainPrompt();
        }
        else if (currentWord.numCorrectGuesses === currentWord.letters.length) {
        	console.log('You won');
        	playAgainPrompt();
        }
        else {
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





//     resetVariables();
//     chooseRandomCity(); //city stored in global variable






// var capitalCities = worldCapitals; //default to world capitals

// var capitalCity = ""; //store the randomly selected Capital
// var capitalCityChars = []; //store each character of the capital in an array
// var country = ""; //store the country of that capital
// var placeholderChars = []; //create an empty array for the placeholder characters '_'
// var blankLetter = '_'; //static variable for the placeholder array
// var spaceHere = "-"; //used to represent a space character

// // active game variables
// var guesses = 0;
// var guessedLetters = ['']; //store the letters the user has already guessed (if incorrect)
// var numCorrectLetters = 0; //use this to calculate when the user has guessed all letters

// // game rules
// var maxGuesses = 9; // the total incorrect guesses before the game is over
// var currentTime;

// var wins = 0;
// var losses = 0;

// //game & page visibility states

// var nameNotEntered = true; //used to check the game state at very beginning
// var stampVisible = false; //used to check if the "Flight Cancelled" Stamp is showing
// var clockHidden = true;
// var newGame = true; //used to check the game state
// var boardingTimeHour = Math.floor(Math.random() * 23 + 1); //this could be made a random number in the future
// var worldCapitalAirlines = true;


// //==========================================================
// // FUNCTIONS
// //==========================================================





// // Write the  first name and last name on the ticket
// //===================================================
// function enterName() {

//     console.log("First: " + document.getElementById('firstNameInput').value + "Last: " + document.getElementById('lastNameInput').value);
//     firstNameText.innerHTML = document.getElementById('firstNameInput').value;
//     lastNameText.innerHTML = document.getElementById('lastNameInput').value;

//     //hide the instructions and name input form
//     console.log("Hide the Jumbotron")
//     document.getElementById('jumbotron-visible').id = "jumbotron-hidden";
//     document.getElementById('ticket-container-hidden').id = "ticket-container-visible";

//     //so we know to start the game on keyboard input
//     nameNotEntered = false;
//     setupNewGame()
// }



// // Decide what to do with keyboard input
// //===================================================
// document.onkeyup = function(event) {
//     var keycode = event.keyCode;
//     //console.log("User Pressed: " + event.key + " keycode " + keycode);
//     //if user hasn't submitted name don't do anything with input
//     if (nameNotEntered) {
//         return; //wait for user to submit name
//     } else if (newGame) {
//         setupNewGame();
//     } else {
//         //check if valid letter entered on keyboard
//         if (keycode < 65 || keycode > 90) {
//             message1.innerHTML = "Please choose a letter from a-z on the keyboard";
//             return;
//         } else { //user entered a valid letter
//             checkGuess(event.key); //check if the letter exists in the word
//         }

//     }
// };


// // Set up the visible elements and set variables 
// // for a new round of the game
// //===================================================
// function setupNewGame() {
//     console.log("new game")
//     //this is a new game
//     resetVariables();
//     chooseRandomCity(); //city stored in global variable
//     writePlaceHolder(); // write a '_' for each letter in the word
//     resetMessages(); //reset message to user with instructions
//     boardingTimeText.innerHTML = boardingTimeHour + ":0" + maxGuesses;

//     //check if  the clock is hidden before trying to show it
//     if (clockHidden) {
//         document.getElementById('clock-text-hidden').id = "clock-text-visible"; //make it visible
//         var clockText = document.getElementById("clock-text-visible");
//         clockText.innerHTML = boardingTimeHour + ":00"; //set the time on the visible clock
//         clockHidden = false;
//     }

// }

// //Pick a random city from the list
// //===================================================
// function chooseRandomCity() {
//     // pick a random city from array
//     randomIndex = Math.floor(Math.random() * capitalCities.length);
//     capitalCity = capitalCities[randomIndex][0].toLowerCase(); //make chars lower case
//     country = capitalCities[randomIndex][1]; //store the country of the selected capital
//     capitalCityChars = capitalCity.split(''); //create an array of the characters

//     //create a array of blank Characters of the same length of the capitalCity
//     for (var i = capitalCityChars.length - 1; i >= 0; i--) {
//         //check for space character and display, else display blank line
//         var spaceChar = /\s/g; //regex to find space chars
//         if (capitalCityChars[i].match(spaceChar)) {
//             placeholderChars[i] = spaceHere; //insert a space Character placeholder
//         } else {
//             placeholderChars[i] = blankLetter; //put the blank letter place holder
//         }
//     }
//     console.log("capitalCity: " + capitalCity); //This should help you get some correct answers for testing
// }

// //Check user guess against word
// //===================================================
// function checkGuess(letter) {
//     message2.innerHTML = ""; //remove the message explaining each guess takes a minute
//     var letterFound = false;
//     // check if letter not already guessed
//     if (guessedLetters.includes(letter)) {
//         message1.innerHTML = "You have already guessed that key";
//     } else {
//         //check letter exists in answer
//         for (var i = 0; i < capitalCityChars.length; i++) {

//             if (capitalCityChars[i] == spaceHere) { //check for space character and display it after first guess
//                 writeLetter(i, " ");
//             }
//             if (capitalCityChars[i] == letter) {
//                 letterFound = true;
//                 numCorrectLetters++;
//                 console.log(letter + " exists at pos: " + i);
//                 writeLetter(i, letter); // write letter at position           
//             } else if (capitalCityChars[i] == letter) {
//                 letterFound = true;
//                 numCorrectLetters++;
//                 console.log("numCorrectLetters: " + numCorrectLetters + "total letters: " + capitalCity.replace(" ", "").length);
//                 writeLetter(i, letter); // write letter at position           
//             }
//         }

//         guessedLetters.push(letter); //add that letter to the guessed array

//         if (letterFound) {
//             //don't increase guess count
//         } else {
//             // letter not found, add that letter as a guess
//             guessedText.innerHTML = (guessedText.innerHTML + " " + letter).replace(blankLetter, ""); // remove prevailing blankLetter marker
//             guesses++;
//             displayGuessesRemaining();
//         }
//         //check if they have guessed all of the letters (excluding spaces)
//         if (numCorrectLetters == capitalCity.replace(" ", "").length) {
//             // all letters Gueses, user wins, game over
//             wins++;
//             winsText.innerHTML = wins;
//             message1.innerHTML = "Nice, you are off to the capital of  " + country + ". Press any key to start again";
//             displayAnswer();
//             // give option to go to harder airline
//             if (!worldCapitalAirlines) {
//                 message2.innerHTML = "Or try our <a href='#'' onclick='changeAirlines()'>International Partner</a>";
//             }
//             newGame = true; //user won the game


//         } else if (guesses == maxGuesses) {
//             // all guesses used, game over
//             losses++;
//             lossesText.innerHTML = losses;
//             message1.innerHTML = "Too Late, you missed your flight to " + country + ".";

//             // give option to go to easier airline
//             if (worldCapitalAirlines) {
//                 message2.innerHTML = "Not taking off? Try our <a href='#'' onclick='changeAirlines()'>Domestic Partner Airline</a> or press any key to start again";

//             } // show the flight cancelled stamp
//             if (!stampVisible) {
//                 document.getElementById('stamp-hidden').id = "stamp-visible";
//                 stampVisible = true;
//             }

//             displayAnswer();
//             newGame = true;
//         }
//     }

// }


// //Reset the text displayed to the user
// //===================================================
// function resetMessages() {
//     message1.innerHTML = "We fly to every world capital city. Guess the the destination by typing one letter at a time.";
//     var remainingGuesses = maxGuesses - guesses;
//     if (!newGame) {
//         message2.innerHTML = "Your flight boards in " + remainingGuesses + " guesses. Each incorrect guess takes 1 minute.";
//     }
// }

// //Display the updated clock time (guesses used)
// //===================================================
// function displayGuessesRemaining() {
//     var clockText = document.getElementById("clock-text-visible");
//     clockText.innerHTML = boardingTimeHour + ":0" + guesses;

// }

// //Reset variables for a new round of game
// //===================================================
// function resetVariables() {
//     console.log("Variables reset");
//     newGame = false; //no longer a new game
//     message1.innerHTML = "";
//     message2.innerHTML = "";
//     guesses = 0;
//     guessedLetters = [""];
//     numCorrectLetters = 0;
//     placeholderChars = [""];
//     wordPlaceHolder.innerHTML = "";
//     guessedText.innerHTML = blankLetter;
//     // remove the fligth cancelled stamp
//     if (stampVisible) {
//         document.getElementById('stamp-visible').id = "stamp-hidden";
//         stampVisible = false;
//     }
// }

// //Display the guessed letter in correct order
// //===================================================
// function writeLetter(letterPos, letter) {
//     placeholderChars[letterPos] = letter;
//     //put actually space characters on the screen
//     wordPlaceHolder.innerHTML = placeholderChars.join("").replace(spaceHere, " ");
// }

// //Display the '_' placeholder
// //===================================================
// function writePlaceHolder() {
//     wordPlaceHolder.innerHTML = placeholderChars.join("");
// }

// //Display the complete word
// //===================================================
// function displayAnswer() {
//     wordPlaceHolder.innerHTML = capitalCity;
// }

// //Change from one airline to another
// //===================================================
// function changeAirlines() {
//    //check which airline is currently being used
//     if (worldCapitalAirlines) {
//         capitalCities = usaCapitals; //change to usa capitals
//         worldCapitalAirlines = false;
//         document.getElementById('stamp-visible').id = "stamp-hidden"; //remove the flight departed stamp
//         stampVisible = false;

//         //change the name and colour on ticket
//         airlineTitle.innerHTML = "US Capital Air";
//         document.getElementById('ticket-stub-top').id = "ticket-stub-top-red";
//         document.getElementById('ticket-main-top').id = "ticket-main-top-red";
//         resetStats();
//         resetVariables(); //Clear wins and losses
//          message1.innerHTML = "US Capital Air - We fly to all the US Capitals";
//          message2.innerHTML = "Press any key to start";
//     } else {
//         capitalCities = worldCapitals; //change to world capitals
//         worldCapitalAirlines = true;
//         //change the name and colour on ticket
//         airlineTitle.innerHTML = "World Capital Airlines";
//         document.getElementById('ticket-stub-top-red').id = "ticket-stub-top";
//         document.getElementById('ticket-main-top-red').id = "ticket-main-top";
//         resetStats();
//         resetVariables(); //Clear wins and losses
//         message1.innerHTML = "World Capital Airlines - We fly to all the World Capitals";
//         message2.innerHTML = "Press any key to start";

//     }

//     newGame = true;

// }

// //Clear wins and losses
// //===================================================
// function resetStats() {
//     wins = 0;
//     losses = 0;
//     winsText.innerHTML = wins;
//     lossesText.innerHTML = losses;
// }