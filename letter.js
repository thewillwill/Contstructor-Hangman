//constructor for the Letter Object
function Letter(character, isSpace) {
	this.character = character; 
	this.guessed = false;     //to check if a user has guessed that character so it can be displayed
	this.isSpace = isSpace;   //to record a character as a non letter (space) character
	this.getPlaceholder = function () {
		//check for space character and display as 3 spaces
		if (this.isSpace) {
			return "   ";
		}
		//display placeholder and a space
		return "_ ";
	}
	this.displayCharacter = function() {
		return this.character + " ";
	}
}

module.exports = Letter;	