var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'farmDB',
});


//Classe qui enregistre les Armes de chaque user

var Armes = (function() {
    var _id;            //id unique d'une arme INT
    var _user_id;       //lien vers l'user a qui appartient la arme INT
    var _armes_spec_id; //lien vers le bon type de arme INT

    function Armes(){
        
    };

    //Methodes
    Armes.prototype.Add_Armes = function(user_id, armes_spec_id){
        var query = 'INSERT INTO Armes (user_id, _armes_spec_id) VALUES ('+user_id+', '+armes_spec_id+');';
        connection.query(query,function(err, rows, fields) {
            if (err) throw err;
            console.log("Armes created");
        });
    };

    Armes.prototype.Delete_Armes = function(id){
        var query = 'DELETE FROM Armes WHERE id='+id;
        connection.query(query,function(err, rows, fields) {
            if (err) throw err;
            console.log("Armes deleted");
        });
    };

    //Getters
    Armes.prototype.getId = function() {
        return _id;
    };
    Armes.prototype.getUserId = function() {
        return _user_id;
    };
    Armes.prototype.getArmesSpecId = function() {
        return _Armes_spec_id;
    };


    //Setters
    Armes.prototype.setId = function(id) {
        _id = id;
    };
    Armes.prototype.setUserId = function(user_id) {
        _user_id = user_id;
    };
    Armes.prototype.setArmesSpecId = function(Armes_spec_id) {
        _Armes_spec_id = Armes_spec_id;
    };

    return Armes;
})();

exports.Armes = function(){
	var a = new Armes();
	return a;
}
