//Classe qui enregistre les Fruits_spec

var Fruits_spec = (function() {
    var _id;                //id unique d'un fruit INT
    var _name;              //nom du fruit String
    var _prix_vente;        //prix du fruit INT
    var _stockage           //temps de stockage du fruit INT
    var _poids              //poids du fruit INT

    function Fruits_spec(){
        
    };

    //Getters
    Fruits_spec.prototype.getId = function() {
        return _id;
    };
    Fruits_spec.prototype.getName = function() {
        return _name;
    };
    Fruits_spec.prototype.getPrixVente = function() {
        return _prix_vente;
    };
    Fruits_spec.prototype.getStockage = function() {
        return _stockage;
    };
    Fruits_spec.prototype.getPoids = function() {
        return _poids;
    };


    //Setters
    Fruits_spec.prototype.setId = function(id) {
        _id = id;
    };
    Fruits_spec.prototype.setName = function(name) {
        _name = name;
    };
    Fruits_spec.prototype.setPrix = function(prix_vente) {
        _prix_vente = prix_vente;
    };
    Fruits_spec.prototype.setStockage = function(stockage) {
        _stockage = stockage;
    };
    Fruits_spec.prototype.setPoids = function(poids) {
        _poids = poids;
    };
    

    return Fruits_spec;
})();

exports.Fruits_spec = function(){
	var a = new Fruits_spec();
	return a;
}