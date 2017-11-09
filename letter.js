
function Letter(character) {
	this.character = character;
	this.guessed = false;
	this.isSpace = false;
	this.getPlaceholder = function () {
		return "_ ";
	}
	this.displayCharacter = function() {
		return this.character + " ";
	}
}

module.exports = Letter;	