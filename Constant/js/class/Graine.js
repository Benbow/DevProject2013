//Classe qui enregistre les graines de chaque user
var DB = require('./DB');

var Graines = (function() {
    var _id;                //id unique d'une graine INT
    var _nb;                //nombre de graine de ce type que le joueur dispose INT
    var _user_id;           //lien vers l'user a qui appartient la graine INT
    var _graines_spec_id;   //lien vers le bon type de graine INT
     var _DB;

    function Graines(){
            _DB = new DB();
    };

     Graines.prototype.buyGraine = function(nb, user_id, graines_spec_id, callback){
         var connection = _DB.connection();
         var query ='SELECT * FROM Graines WHERE user_id= ' + user_id + ' AND  graines_spec_id = ' + graines_spec_id + ';';
          connection.query(query,function(err, row, fields) {
            if (err) throw err;
             if( typeof( row[0]) == "undefined"){
                var query = 'INSERT INTO Graines (nb,user_id, graines_spec_id) VALUES(' + nb + ',' + user_id + ','+ graines_spec_id +');';
                connection.query(query,function(err, r, fields) {
                if (err) throw err;
                callback(true);
              });

             }else{
                connection.query('UPDATE Graines SET nb = nb + '+nb+' WHERE user_id = '+user_id +' AND graines_spec_id = ' +graines_spec_id+ ';' ,function(err, r, fields) {
                            if(err) throw err;
                            callback(true);
                     });

                 }
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

module.exports = Graines;
