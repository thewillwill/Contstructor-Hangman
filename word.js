// Requiring our Letter constructor function we exported from letter.js
var Letter = require("./letter.js");

//Constructor function for Word object
function Word() {
    this.letters = [];   //array of letters that make up the word
    this.lettersGuessed = [];  //to record letters guessed the user has made
    this.numCorrectGuesses=0;  //used to check if player has guessed the full  word
    this.numSpaces = 0;    //used to count the total number of characters in a "Word"
    this.guesses = 0;   //guesses used
    this.maxGuesses = 8; // the total incorrect guesses before the round is over
    this.addLetters = function(character) {

        //check if the character is a space using regex syntax
        if(character.match(/\s/g)) {
            //add the space character and 'true' to set is Space character
            this.letters.push(new Letter(character, true));
            this.numSpaces ++;
        }
        else {
            //add the letter character and set false to set is Space character 
            this.letters.push(new Letter(character, false));
        }
    };
    this.letterFound = function(letterIndex) {
        this.letters[letterIndex].guessed = true;
    }

}

Word.prototype.toString = function() {
    if (this.letters.length > 0 ) {
        var fullWord ="";
        for (var i = 0; i < this.letters.length; i++) {
            fullWord += this.letters[i].character;
        }
       return fullWord;
    }
}

Word.prototype.getWord = function() {
        var word = "";
        for (var i = 0; i < this.letters.length; i++) {
            if (this.letters[i].guessed) {
                word += this.letters[i].displayCharacter();
            } else {
                word += this.letters[i].getPlaceholder();
            }

        }
        return word;
    }

Word.prototype.checkGuess = function(character) {

        for (var i = 0; i < this.lettersGuessed.length; i++) {
            if (character === this.lettersGuessed[i]) {
                console.log("You have already guessed:", character)
                return; //exit out of this function
            }
        }

        var letterFound = false;
        for (var i = 0; i < this.letters.length; i++) {
            if (this.letters[i].character === character) {
                this.letters[i].guessed = true;
                this.numCorrectGuesses++;
                letterFound = true;
                console.log("Good Guess!");
            }
        }
        if (!letterFound) {
            this.guesses ++;
            console.log('Incorrect!\n Guesses Remaining: ', (this.maxGuesses - this.guesses))
        }

        //record the users guess so they can't guess that letter again
        this.lettersGuessed.push(character);
    }

module.exports = Word;