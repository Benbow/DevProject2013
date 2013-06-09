var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'farmDB',
});
//Classe qui enregistre les Tiles de chaque user

var Tiles = (function() {
    var _id;            //id unique d'une arme INT
    var _x;             //coord en x INT
    var _y;             //coord en y INT
    var _isEmpty        //booleen de vérification de tile libre TinyINT
    var _sprite_id;     //id du sprite image de la tile INT
    var _humidite;      //indicateur d'humidite INT
    var _fertilite;     //indicateur de fertilité INT
    var _isVisible;     //indicateur de Tile Avtive TinyINT
    var _user_id;       //lien vers l'user a qui appartient la arme INT
   

    function Tiles(){
        
    };

    Tiles.prototype.Watering = function(tile_id, user_id, callback){
        var query = 'SELECT * FROM Plantes where tile_id ='+tile_id+';';
        connection.query(query,function(err, row, fields) {
            if (err) throw err;
            if( typeof( row[0] ) != "undefined" ){
                query = 'SELECT * FROM Tiles where id ='+tile_id+';';
                connection.query(query,function(err, rows, fields) {
                    if (err) throw err;
                    var h = rows[0].humidite +10;
                    query = 'UPDATE Tiles SET humidite = '+h+' WHERE id ='+tile_id+';';
                    connection.query(query,function(err, rows, fields) {
                        if (err) throw err;
                        console.log('success watering');
                        callback(true);
                    });
                });
            }else{
                callback(false);
            }
            
        }); 
    };

    //Getters
    Tiles.prototype.getId = function() {
        return _id;
    };
    Tiles.prototype.getX = function() {
        return _x;
    };
    Tiles.prototype.getY = function() {
        return _y;
    };
    Tiles.prototype.getIsEmpty = function() {
        return _isEmpty;
    };
    Tiles.prototype.getSpriteId = function() {
        return _sprite_id;
    };
    Tiles.prototype.getHumidite = function() {
        return _humidite;
    };
    Tiles.prototype.getFertilite = function() {
        return _fertilite;
    };
    Tiles.prototype.getIsVisible = function() {
        return _isVisible;
    };
    Tiles.prototype.getUserId = function() {
        return _user_id;
    };
    

    //Setters
    Tiles.prototype.setId = function(id) {
        _id = id;
    };
    Tiles.prototype.setX = function(x) {
        _x = x;
    };
    Tiles.prototype.setY = function(y) {
        _y = y;
    };
    Tiles.prototype.setIsEmpty = function(isEmpty) {
        _isEmpty = isEmpty;
    };
    Tiles.prototype.setSpriteId = function(sprite_id) {
        _sprite_id = sprite_id;
    };
    Tiles.prototype.setHumidite = function(humidite) {
        _humidite = humidite;
    };
    Tiles.prototype.setFertilite = function(fertilite) {
        _fertilite = fertilite;
    };
    Tiles.prototype.setIsVisible = function(isVisible) {
        _isVisible = isVisible;
    };
    Tiles.prototype.setUserId = function(user_id) {
        _user_id = user_id;
    };
   

    return Tiles;
})();

module.exports = Tiles;
