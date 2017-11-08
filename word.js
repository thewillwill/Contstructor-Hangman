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
    this.getWord = function() {
        var word = "";
        for (var i = 0; i < this.letters.length; i++) {
            if (this.letters[i].guessed) {
                word += this.letters[i].getCharacter();
            } else {
                word += this.letters[i].getPlaceholder();
            }

        }
        return word;
    }
    this.getFullWord = function() {
        var word = "";
        for (var i = 0; i < this.letters.length; i++) {
            word += this.letters[i].getCharacter();;
        }

    }
    this.checkGuess = function(character) {

        for (var i = 0; i < this.lettersGuessed.length; i++) {
            if (character === lettersGuessed[i]) {
                console.log("You have already guessed:", character)
                return; //exit out of this function
            }
        }


        var letterFound = false;
        for (var i = 0; i < this.letters.length; i++) {
            if (this.letters[i].getCharacter() === character) {
                this.letters[i].guessed = true;
                this.numCorrectGuesses++;
                console.log('L51', 'this.numCorrect...ses:', this.numCorrectGuesses)
                letterFound = true;
                console.log("letter found at", i);
            }
        }
        if (!letterFound) {
            this.guesses ++;
        }
    }

}

module.exports = Word;