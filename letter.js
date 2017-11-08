
function Letter(character) {
	this.character = character;
	this.guessed = false;
	this.isSpace = false;
	this.getPlaceholder = function () {
		return "-";
	}
	this.getCharacter = function() {
		return this.character;
	}
	this.spaceCharacter = function () {
		return " ";
	}
}


module.exports = Letter;