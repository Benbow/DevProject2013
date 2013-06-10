var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'farmDB',
});
//Classe qui enregistre les Fruits de chaque user

var Fruits = (function() {
    var _id;                //id unique d'un fruit INT
    var _nb                 //nombre de fruit
    var _user_id;           //lien vers l'user a qui appartient le fruit INT
    var _fruits_spec_id;    //lien vers le bon type de fruit INT

    function Fruits(){
        
    };

    Fruits.prototype.storeFruits = function(user_id, stockage_id, fruit_id, nb_fruits, poids, callback){
        saveFruits(user_id, stockage_id, fruit_id, nb_fruits, function(cb){
            var query = 'SELECT * FROM Stockages WHERE id ='+stockage_id+';';
            connection.query(query,function(err, r, fields) {
                if (err) throw err;
                if(typeof(r[0]) != 'undefined'){
                    var nb = r[0].stockage_state - (poids);
                    query = 'UPDATE Stockages SET stockage_state = '+nb+' WHERE id ='+stockage_id+';';
                    connection.query(query,function(err, r, fields) {
                        callback({
                            ok: true,
                            nb: nb_fruits
                        });
                    });
                }
            });
        });
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

    function saveFruits(user_id, stockage_id, fruit_id, nb_fruits, callback){
        while(nb_fruits > 0){
            saveFruit(user_id, fruit_id, stockage_id);
            nb_fruits--;
        }
        callback(true);
    }

    function saveFruit(user_id, fruit_id, stockage_id){
        //console.log(user_id+" "+fruit_id+" "+stockage_id)
        var query = 'INSERT INTO Fruits (user_id,fruits_spec_id, stockage_id) VALUES(' + user_id + ',' + fruit_id + ','+ stockage_id +');';
        connection.query(query,function(err, r, fields) {
            if (err) throw err;
        });
    }

    return Fruits;
})();

module.exports = Fruits;
