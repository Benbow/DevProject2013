//Classe indexant les différents types de graines du jeu

var Graines_spec = (function() {
    var _id;            //id unique d'une graine INT
    var _name;          //nom de la graine Varchar 45
    var _maturation;    //temps de maturation d'une graine, avant d'atteindre sa maturité INT
    var _pourrissement; //temps de pourrissement, avant que la graine ne pourrisse (après maturité) INT
    var _production;    //ratio maximale de fruit récoltable INT
    var _stockage;      //temps durant lequel la graine peut être stocké sans pourrir
    var _croissance;    //temps qu'il faudra pour passer au stade suivant
    var _poids;         //nombre d'unités de stockages que la graines va prendre
    var _prix;          //prix de la graine
    var _sante_min;     //santé minimum requise par la graine pour continuer sa croissance
    var _niveau_requis; //niveau que le joueur doit avoir pour acheter/utiliser la graine


    function Graines_spec(){
        
    };
    //Getters
    Graines_spec.prototype.getId = function() {
        return _id;
    };
    Graines_spec.prototype.getName = function() {
        return _name;
    };
    Graines_spec.prototype.getMaturation = function() {
        return _maturation;
    };
    Graines_spec.prototype.getPourrissement = function() {
        return _pourrissement;
    };
    Graines_spec.prototype.geProduction = function() {
        return _production;
    };
    Graines_spec.prototype.getStockage = function() {
        return _stockage;
    };
    Graines_spec.prototype.getCroissance = function() {
        return _croissance;
    };
    Graines_spec.prototype.getPoids = function() {
        return _poids;
    };
    Graines_spec.prototype.getPrix = function() {
        return _prix;
    };
    Graines_spec.prototype.getSanteMin = function() {
        return _sante_min;
    };
    Graines_spec.prototype.getNiveauRequis = function() {
        return _niveau_requis;
    };

    //Setters
    Graines_spec.prototype.setId = function(id) {
        _id = id;
    };
    Graines_spec.prototype.setName = function(name) {
        _name = name;
    };
    Graines_spec.prototype.setMaturation = function(maturation) {
        _maturation = maturation;
    };
    Graines_spec.prototype.setProduction = function(production) {
        _production = production;
    };
    Graines_spec.prototype.setPourrissement = function(pourrissement) {
        _pourrissement = pourrissement;
    };
    Graines_spec.prototype.setStockage = function(stockage) {
        _stockage = stockage;
    };
    Graines_spec.prototype.setCroissance = function(croissance) {
        _croissance = croissance;
    };
    Graines_spec.prototype.setPoids = function(poids) {
        _poids = poids;
    };
    Graines_spec.prototype.setPrix = function(prix) {
        _prix = prix;
    };
    Graines_spec.prototype.setSanteMin = function(sante_min) {
        _sante_min = sante_min;
    };
    Graines_spec.prototype.setNiveauRequis = function(niveau_requis*) {
        _niveau_requis = niveau_requis;
    };
    
    
    return Graines_spec;
})();

exports.Graines_spec = function(){
	var a = new Graines_spec();
	return a;
}
