// Requiring our CastMember constructor function we exported from castMember.js
var Letter = require("./letter.js");

function Word() {
    this.letters = [];
    this.lettersGuessed = []; //to record letters guessed the user has made
    this.numCorrectGuesses=0;
    this.guesses = 0;
    this.maxGuesses = 9; // the total incorrect guesses before the round is over
    this.addLetters = function(character) {
        this.letters.push(new Letter(character));
    };
    this.letterFound = function(letterIndex) {
        this.letters[letterIndex].guessed = true;
    }

}

Word.prototype.toString = function() {
    if (letters.length > 0 ) {
       return letters.join();
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
            if (character === lettersGuessed[i]) {
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
    }

module.exports = Word;