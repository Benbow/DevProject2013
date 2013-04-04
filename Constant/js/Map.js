var Map = new function() {
	this.largeur = 150;

	this.getLargeur = function(){
		console.log('la largeur est de ' + this.largeur);
	};
}

function Start() {
	this.largeur = 200;
}

exports.Map = Map;