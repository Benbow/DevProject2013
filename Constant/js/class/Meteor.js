//Classe qui enregistre les Meteor de chaque user

var Meteor = (function() {
    var _id;                //id unique d'une arme INT
    var _isActive           //détermine si l'évènement naturel est actif TinyINT
    var _origin_tile_id;    //lien vers l'user a qui appartient la arme INT
    var _longueur;          //longeur de la zone affectée INT
    var _largeur;           //largeur de la zone affectée INT
    var _duree;             //durée de l'évènement INT
    var _x;                 //coordonée en X de l'origine INT
    var _y;                 //coordonée en Y de l'origine INT

    function Meteor(){
        
    };

    //Getters
    Meteor.prototype.getId = function() {
        return _id;
    };
    Meteor.prototype.getIsActive = function() {
        return _isActive;
    };
    Meteor.prototype.getOriginTileId = function() {
        return _origin_tile_id;
    };
    Meteor.prototype.getLongueur = function() {
        return _longueur;
    };
    Meteor.prototype.getLargeur = function() {
        return _largeur;
    };
    Meteor.prototype.getDuree = function() {
        return _duree;
    };
    Meteor.prototype.getX = function() {
        return _x;
    };
    Meteor.prototype.getY = function() {
        return _y;
    };


    //Setters
    Meteor.prototype.setId = function(id) {
        _id = id;
    };
    Meteor.prototype.setIsActive = function(isActive) {
        _isActive = isActive;
    };
    Meteor.prototype.setOriginTileId = function(origin_tile_id) {
        _origin_tile_id = origin_tile_id;
    };
    Meteor.prototype.setLongueur = function(longueur) {
        _longueur = longueur;
    };
    Meteor.prototype.setLargeur = function(largeur) {
        _largeur = largeur;
    };
    Meteor.prototype.setDuree = function(duree) {
        _duree = duree;
    };
    Meteor.prototype.setX = function(x) {
        _x = x;
    };
    Meteor.prototype.setY = function(y) {
        _y = y;
    };
    

    return Meteor;
})();

exports.Meteor = function(){
	var a = new Meteor();
	return a;
}
