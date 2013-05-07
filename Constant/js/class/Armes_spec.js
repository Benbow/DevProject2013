var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'farmDB',
});


//Classe indexant les différents types d'armes du jeu

var Armes_spec = (function() {
    var _id;   		//id unique d'une arme INT
    var _name;		//nom de l'arme VarChar
    var _puissance;	//puissance de l'arme, dégats INT
    var _precision;	//precision de l'arme, pourcentage INT
    var _vitesse;	//vitesse d'attaque de l'arme INT
    var _prix;		//prix de l'arme INT

    function Armes_spec(){
        
    };

    //Methodes
    Armes_spec.prototype.Add_Armes_spec = function(name, puissance, precision, vitesse, prix){
        var query = 'INSERT INTO Armes_spec (name, puissance, precision, vitesse, prix) VALUES ("'+name+'", '+puissance+', '+precision+', '+vitesse+', '+prix+');';
        connection.query(query,function(err, rows, fields) {
            if (err) throw err;
            console.log("Armes_spec created");
        });
    };

    Armes_spec.prototype.Delete_Armes_spec = function(id){
        var query = 'DELETE FROM Armes_spec WHERE id='+id;
        connection.query(query,function(err, rows, fields) {
            if (err) throw err;
            console.log("Armes_spec deleted");
        });
    };



    //Getters
    Armes_spec.prototype.getId = function() {
        return _id;
    };
    Armes_spec.prototype.getName = function() {
        return _name;
    };
    Armes_spec.prototype.getPuissance = function() {
        return _puissance;
    };
     Armes_spec.prototype.getPrecision = function() {
        return _precision;
    };
     Armes_spec.prototype.getVitesse = function() {
        return _vitesse;
    };
     Armes_spec.prototype.getPrix = function() {
        return _prix;
    };


    //Setters
    Armes_spec.prototype.setId = function(id) {
        _id = id;
    };
    Armes_spec.prototype.setName = function(name) {
        _name = name;
    };
    Armes_spec.prototype.setPuissance = function(puissance) {
        _puissance = puissance;
    };
    Armes_spec.prototype.setPrecision = function(precision) {
        _precision = precision;
    };
    Armes_spec.prototype.setVitesse = function(vitesse) {
        _vitesse = vitesse;
    };
    Armes_spec.prototype.setPrix = function(prix) {
        _prix = prix;
    };
    
    return Armes_spec;
})();

exports.Armes_spec = function(){
	var a = new Armes_spec();
	return a;
}
