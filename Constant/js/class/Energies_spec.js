//Classe qui enregistre les Energies_spec 

var Energies_spec = (function() {
    var _id;                //id unique du batiment INT
    var _name;              //nom du batiments INT
    var _constructionTime;  //temps de construction INT
    var _production;        //valeur de production par minutes INT
    var _niveau_requis;     //niveau requis par le batiment INT

    function Energies_spec(){
        
    };

    //Getters
    Energies_spec.prototype.getId = function() {
        return _id;
    };
    Energies_spec.prototype.getName = function() {
        return _name;
    };
    Energies_spec.prototype.getConstructionTime = function() {
        return _constructionTime;
    };
    Energies_spec.prototype.getProduction = function() {
        return _production;
    };
    Energies_spec.prototype.getNiveauRequis = function() {
        return _niveau_requis;
    };


    //Setters
    Energies_spec.prototype.setId = function(id) {
        _id = id;
    };
    Energies_spec.prototype.setName = function(name) {
        _name = name;
    };
    Energies_spec.prototype.setConstructionTime = function(constructionTime) {
        _constructionTime = constructionTime;
    };
    Energies_spec.prototype.setProduction = function(production) {
        _production = production;
    };
    Energies_spec.prototype.setNiveauRequis = function(niveau_requis) {
        _niveau_requis = niveau_requis;
    };

    return Energies_spec;
})();

exports.Energies_spec = function(){
	var a = new Energies_spec();
	return a;
}
