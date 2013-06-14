//Classe qui enregistre les Pluie de chaque user

var Pluie = (function() {
    var _id;                //id unique d'une arme INT
    var _isActive           //détermine si l'évènement naturel est actif TinyINT
    var _origin_tile_id;    //lien vers l'user a qui appartient la arme INT
    var _longueur;          //longeur de la zone affectée INT
    var _largeur;           //largeur de la zone affectée INT
    var _duree;             //durée de l'évènement INT
    var _x;                 //coordonée en X de l'origine INT
    var _y;                 //coordonée en Y de l'origine INT

    function Pluie(){
        
    };

    //Getters
    Pluie.prototype.getId = function() {
        return _id;
    };
    Pluie.prototype.getIsActive = function() {
        return _isActive;
    };
    Pluie.prototype.getOriginTileId = function() {
        return _origin_tile_id;
    };
    Pluie.prototype.getLongueur = function() {
        return _longueur;
    };
    Pluie.prototype.getLargeur = function() {
        return _largeur;
    };
    Pluie.prototype.getDuree = function() {
        return _duree;
    };
    Pluie.prototype.getX = function() {
        return _x;
    };
    Pluie.prototype.getY = function() {
        return _y;
    };


    //Setters
    Pluie.prototype.setId = function(id) {
        _id = id;
    };
    Pluie.prototype.setIsActive = function(isActive) {
        _isActive = isActive;
    };
    Pluie.prototype.setOriginTileId = function(origin_tile_id) {
        _origin_tile_id = origin_tile_id;
    };
    Pluie.prototype.setLongueur = function(longueur) {
        _longueur = longueur;
    };
    Pluie.prototype.setLargeur = function(largeur) {
        _largeur = largeur;
    };
    Pluie.prototype.setDuree = function(duree) {
        _duree = duree;
    };
    Pluie.prototype.setX = function(x) {
        _x = x;
    };
    Pluie.prototype.setY = function(y) {
        _y = y;
    };
    

    return Pluie;
})();

module.exports = Pluie;
