//Classe qui enregistre les Tornades de chaque user

var Tornades = (function() {
    var _id;                //id unique d'une arme INT
    var _isActive           //détermine si l'évènement naturel est actif TinyINT
    var _origin_tile_id;    //lien vers l'user a qui appartient la arme INT
    var _vectorX;           //vecteur de déplacement en X
    var _vectorY;           //vecteur de déplacement en Y
    var _longueur;          //longeur de la zone affectée INT
    var _largeur;           //largeur de la zone affectée INT
    var _duree;             //durée de l'évènement INT
    var _x;                 //coordonée en X de l'origine INT
    var _y;                 //coordonée en Y de l'origine INT

    function Tornades(){
        
    };

    //Getters
    Tornades.prototype.getId = function() {
        return _id;
    };
    Tornades.prototype.getIsActive = function() {
        return _isActive;
    };
    Tornades.prototype.getOriginTileId = function() {
        return _origin_tile_id;
    };
    Tornades.prototype.getVectorX = function() {
        return _vectorX;
    };
    Tornades.prototype.getVectorY = function() {
        return _vectorY;
    };
    Tornades.prototype.getLongueur = function() {
        return _longueur;
    };
    Tornades.prototype.getLargeur = function() {
        return _largeur;
    };
    Tornades.prototype.getDuree = function() {
        return _duree;
    };
    Tornades.prototype.getX = function() {
        return _x;
    };
    Tornades.prototype.getY = function() {
        return _y;
    };


    //Setters
    Tornades.prototype.setId = function(id) {
        _id = id;
    };
    Tornades.prototype.setIsActive = function(isActive) {
        _isActive = isActive;
    };
    Tornades.prototype.setOriginTileId = function(origin_tile_id) {
        _origin_tile_id = origin_tile_id;
    };
    Tornades.prototype.setVectorX = function(vectorX) {
        _vectorX = vectorX;
    };
    Tornades.prototype.setVectorY = function(vectorY) {
        _vectorY = vectorY;
    };
    Tornades.prototype.setLongueur = function(longueur) {
        _longueur = longueur;
    };
    Tornades.prototype.setLargeur = function(largeur) {
        _largeur = largeur;
    };
    Tornades.prototype.setDuree = function(duree) {
        _duree = duree;
    };
    Tornades.prototype.setX = function(x) {
        _x = x;
    };
    Tornades.prototype.setY = function(y) {
        _y = y;
    };
    

    return Tornades;
})();

exports.Tornades = function(){
	var a = new Tornades();
	return a;
}
