//Classe qui enregistre les Tiles de chaque user

var Tiles = (function() {
    var _id;            //id unique d'une arme INT
    var _x;             //coord en x INT
    var _y;             //coord en y INT
    var _isEmpty        //booleen de vérification de tile libre TinyINT
    var _sprite_id;     //id du sprite image de la tile INT
    var _humidite;      //indicateur d'humidite INT
    var _fertilite;     //indicateur de fertilité INT
    var _isVisible;     //indicateur de Tile Avtive TinyINT
    var _user_id;       //lien vers l'user a qui appartient la arme INT
   

    function Tiles(){
        
    };

    //Getters
    Tiles.prototype.getId = function() {
        return _id;
    };
    Tiles.prototype.getX = function() {
        return _x;
    };
    Tiles.prototype.getY = function() {
        return _y;
    };
    Tiles.prototype.getIsEmpty = function() {
        return _isEmpty;
    };
    Tiles.prototype.getSpriteId = function() {
        return _sprite_id;
    };
    Tiles.prototype.getHumidite = function() {
        return _humidite;
    };
    Tiles.prototype.getFertilite = function() {
        return _fertilite;
    };
    Tiles.prototype.getIsVisible = function() {
        return _isVisible;
    };
    Tiles.prototype.getUserId = function() {
        return _user_id;
    };
    

    //Setters
    Tiles.prototype.setId = function(id) {
        _id = id;
    };
    Tiles.prototype.setX = function(x) {
        _x = x;
    };
    Tiles.prototype.setY = function(y) {
        _y = y;
    };
    Tiles.prototype.setIsEmpty = function(isEmpty) {
        _isEmpty = isEmpty;
    };
    Tiles.prototype.setSpriteId = function(sprite_id) {
        _sprite_id = sprite_id;
    };
    Tiles.prototype.setHumidite = function(humidite) {
        _humidite = humidite;
    };
    Tiles.prototype.setFertilite = function(fertilite) {
        _fertilite = fertilite;
    };
    Tiles.prototype.setIsVisible = function(isVisible) {
        _isVisible = isVisible;
    };
    Tiles.prototype.setUserId = function(user_id) {
        _user_id = user_id;
    };
   

    return Tiles;
})();

exports.Tiles = function(){
	var a = new Tiles();
	return a;
}