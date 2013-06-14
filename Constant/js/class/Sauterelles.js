//Classe qui enregistre les Sauterelles de chaque user

var Sauterelles = (function() {
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

    function Sauterelles(){
        
    };

    //Getters
    Sauterelles.prototype.getId = function() {
        return _id;
    };
    Sauterelles.prototype.getIsActive = function() {
        return _isActive;
    };
    Sauterelles.prototype.getOriginTileId = function() {
        return _origin_tile_id;
    };
    Sauterelles.prototype.getVectorX = function() {
        return _vectorX;
    };
    Sauterelles.prototype.getVectorY = function() {
        return _vectorY;
    };
    Sauterelles.prototype.getLongueur = function() {
        return _longueur;
    };
    Sauterelles.prototype.getLargeur = function() {
        return _largeur;
    };
    Sauterelles.prototype.getDuree = function() {
        return _duree;
    };
    Sauterelles.prototype.getX = function() {
        return _x;
    };
    Sauterelles.prototype.getY = function() {
        return _y;
    };


    //Setters
    Sauterelles.prototype.setId = function(id) {
        _id = id;
    };
    Sauterelles.prototype.setIsActive = function(isActive) {
        _isActive = isActive;
    };
    Sauterelles.prototype.setOriginTileId = function(origin_tile_id) {
        _origin_tile_id = origin_tile_id;
    };
    Sauterelles.prototype.setVectorX = function(vectorX) {
        _vectorX = vectorX;
    };
    Sauterelles.prototype.setVectorY = function(vectorY) {
        _vectorY = vectorY;
    };
    Sauterelles.prototype.setLongueur = function(longueur) {
        _longueur = longueur;
    };
    Sauterelles.prototype.setLargeur = function(largeur) {
        _largeur = largeur;
    };
    Sauterelles.prototype.setDuree = function(duree) {
        _duree = duree;
    };
    Sauterelles.prototype.setX = function(x) {
        _x = x;
    };
    Sauterelles.prototype.setY = function(y) {
        _y = y;
    };
    

    return Sauterelles;
})();

module.exports = Sauterelles;
