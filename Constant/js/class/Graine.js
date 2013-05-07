var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'farmDB',
});


//Classe qui enregistre les graines de chaque user

var Graines = (function() {
    var _id;                //id unique d'une graine INT
    var _nb;                //nombre de graine de ce type que le joueur dispose INT
    var _user_id;           //lien vers l'user a qui appartient la graine INT
    var _graines_spec_id;   //lien vers le bon type de graine INT

    function Graines(){
        
    };

    //Methodes
    Graines.prototype.Add_Graines = function(nb, user_id, _graines_spec_id){
        var query = 'INSERT INTO Graines (nb, user_id, _graines_spec_id) VALUES ('+nb+', '+user_id+', '+_graines_spec_id+');';
        connection.query(query,function(err, rows, fields) {
            if (err) throw err;
            console.log("Graines created");
        });
    };

    Graines.prototype.Delete_Graines = function(id){
        var query = 'DELETE FROM Graines WHERE id='+id;
        connection.query(query,function(err, rows, fields) {
            if (err) throw err;
            console.log("Graines deleted");
        });
    };

    //Getters
    Graines.prototype.getId = function() {
        return _id;
    };
    Graines.prototype.getNb = function() {
        return _nb;
    };
    Graines.prototype.getUserId = function() {
        return _user_id;
    };
    Graines.prototype.getGrainesSpecId = function() {
        return _graines_spec_id;
    };


    //Setters
    Graines.prototype.setId = function(id) {
        _id = id;
    };
    Graines.prototype.setNb = function(nb) {
        _nb = nb;
    };
    Graines.prototype.setUserId = function(user_id) {
        _user_id = user_id;
    };
    Graines.prototype.setGrainesSpecId = function(graines_spec_id) {
        _graines_spec_id = graines_spec_id;
    };

    return Graines;
})();

exports.Graines = function(){
	var a = new Graines();
	return a;
}
