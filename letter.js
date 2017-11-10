
function Letter(character, isSpace) {
	this.character = character;
	this.guessed = false;
	this.isSpace = isSpace;
	this.getPlaceholder = function () {
		if (this.isSpace) {
			return "   ";
		}
		return "_ ";
	}
	this.displayCharacter = function() {
		return this.character + " ";
	}
}

module.exports = Letter;	