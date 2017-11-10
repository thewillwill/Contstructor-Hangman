// Requiring our Letter constructor function we exported from letter.js
var Letter = require("./letter.js");

//Constructor function for Word object
function Word() {
    this.letters = []; //array of letters that make up the word
    this.lettersGuessed = []; //to record letters guessed the user has made
    this.numCorrectGuesses = 0; //used to check if player has guessed the full  word
    this.numSpaces = 0; //used to count the total number of characters in a "Word"
    this.guesses = 0; //guesses used
    this.maxGuesses = 8; // the total incorrect guesses before the round is over
    this.addLetters = function(character) {

        //check if the character is a space using regex syntax
        if (character.match(/\s/g)) {
            //add the space character and 'true' to set is Space character
            this.letters.push(new Letter(character, true));
            this.numSpaces++;
        } else {
            //add the letter character and set false to set is Space character 
            this.letters.push(new Letter(character, false));
        }
    };
    this.letterFound = function(letterIndex) {
        this.letters[letterIndex].guessed = true;
    }

}

//================================
// WORD Prototype Functions
//================================


// return the word as a string
//================================
Word.prototype.toString = function() {
    //check there is at least 1 letter
    if (this.letters.length > 0) {
        var fullWord = "";
        //go through all the letters and append them to fullWord
        for (var i = 0; i < this.letters.length; i++) {
            fullWord += this.letters[i].character;
        }
        return fullWord;
    }
}

//return the letters of the word (if guessed) or a placeholder if not guessed
//================================
Word.prototype.getWord = function() {
    var word = "";
    //iterate through letters to check if any guessed
    for (var i = 0; i < this.letters.length; i++) {

        //if guessed display the character
        if (this.letters[i].guessed) {
            word += this.letters[i].displayCharacter();
            //if not guessed display a placeholder
        } else {
            word += this.letters[i].getPlaceholder();
        }

    }
    //return the word string
    return word;
}

//Check if the user has guessed a character in the word
//================================

Word.prototype.checkGuess = function(character) {
    //check the user hasn't already guessed that character
    for (var i = 0; i < this.lettersGuessed.length; i++) {
        if (character === this.lettersGuessed[i]) {
            console.log("You have already guessed:", character)
            return; //exit out of this function
        }
    }
    //iterate through all letters to see if a match is found
    var letterFound = false;
    for (var i = 0; i < this.letters.length; i++) {
        if (this.letters[i].character === character) {
            this.letters[i].guessed = true;
            this.numCorrectGuesses++;        //increase the number of correct guesses (so we can tell when a user has guessed all letters)
            letterFound = true; 
            console.log("Good Guess!");
        }
    }

    //if no letter was found, increase the number of incorrect guesses
    if (!letterFound) {
        this.guesses++;
        console.log('Incorrect!\n Guesses Remaining: ', (this.maxGuesses - this.guesses))
    }

    //record the users guess so they can't guess that letter again
    this.lettersGuessed.push(character);
}

module.exports = Word;