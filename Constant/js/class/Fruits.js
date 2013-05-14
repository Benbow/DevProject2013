//Classe qui enregistre les Fruits de chaque user

var Fruits = (function() {
    var _id;                //id unique d'un fruit INT
    var _nb                 //nombre de fruit
    var _user_id;           //lien vers l'user a qui appartient le fruit INT
    var _fruits_spec_id;    //lien vers le bon type de fruit INT

    function Fruits(){
        
    };

    //Getters
    Fruits.prototype.getId = function() {
        return _id;
    };
    Fruits.prototype.getNb = function() {
        return _nb;
    };
    Fruits.prototype.getUserId = function() {
        return _user_id;
    };
    Fruits.prototype.getFruitsSpecId = function() {
        return _fruits_spec_id;
    };


    //Setters
    Fruits.prototype.setId = function(id) {
        _id = id;
    };
    Fruits.prototype.setNb = function(nb) {
        _nb = nb;
    };
    Fruits.prototype.setUserId = function(user_id) {
        _user_id = user_id;
    };
    Fruits.prototype.setFruitsSpecId = function(fruits_spec_id) {
        _fruits_spec_id = fruits_spec_id;
    };

    return Fruits;
})();

exports.Fruits = function(){
	var a = new Fruits();
	return a;
}
