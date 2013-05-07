var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'farmDB',
});

//Classe qui enregistre les bâtiments de stockages de chaque user

var Stockages = (function() {

    //attributs
    var _id;                //id unique d'un bâtiments de stockages INT
    var _stockage_state;    //état actuel de contenance du bâtiments de stockage INT
    var _isConstruct;       //permet de vérifier si le bâtiment est en construction ou non INT
    var _user_id;           //relie un user à son bâtiment INT
    var _stockages_spec_id; //détermine le type du bâtiment INT
    var _tile_id;           //relie le bâtiment à la tile ou il est construit INT 

    //Constructeurs
    function Stockages(){
        
    };

    //Methodes
    Stockages.prototype.Add_Stockages = function(stockage_state, isConstruct, user_id, stockages_spec_id, tile_id){
        var query = 'INSERT INTO Stockages (stockage_state, isConstruct, user_id, stockages_spec_id, tile_id) VALUES ('+stockage_state+', '+isConstruct+', '+user_id+', '+stockages_spec_id+', '+tile_id+');';
        connection.query(query,function(err, rows, fields) {
            if (err) throw err;
            console.log("Stockages created");
        });
    };

    Stockages.prototype.Delete_Stockages = function(id){
        var query = 'DELETE FROM Stockages WHERE id='+id;
        connection.query(query,function(err, rows, fields) {
            if (err) throw err;
            console.log("Stockages deleted");
        });
    };

    
    //Getters
    Stockages.prototype.getId = function() {
        return _id;
    };
    Stockages.prototype.getStockageState = function() {
        return _stockage_state;
    };
    Stockages.prototype.getIsConstruct = function() {
        return _isConstruct;
    };
    Stockages.prototype.getUserId = function() {
        return _user_id;
    };
    Stockages.prototype.getStockageSpecId = function() {
        return _stockages_spec_id;
    };
    Stockages.prototype.getTileId = function() {
        return _tile_id;
    };

    //Setters
    Stockages.prototype.setId = function(id) {
        _id = id;
    };
    Stockages.prototype.setStockageState = function(stockage_state) {
        _stockage_state = stockage_state;
    };
    Stockages.prototype.setIsConstruct = function(isConstruct) {
        _isConstruct = isConstruct;
    };
    Stockages.prototype.setUserId = function(user_id) {
        _user_id = user_id;
    };
    Stockages.prototype.setStockageSpecId = function(stockages_spec_id) {
        _stockages_spec_id = stockages_spec_id;
    };
    Stockages.prototype.setTileId = function(tile_id) {
        _tile_id = tile_id;
    };
    
    
    return Stockages;
})();

exports.Stockages = function(){
	var a = new Stockages();
    //a.Add_Stockages(1, 1, 1, 1, 1);
    //a.Delete_Stockages(1);
	return a;
}
