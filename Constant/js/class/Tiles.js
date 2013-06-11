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
        var query = 'SELECT * FROM Arrosoirs WHERE user_id ='+user_id+' AND isActive = 1;';
        connection.query(query,function(err, row, fields) {
            if (err) throw err;
            if( typeof( row[0].current ) != "undefined" && row[0].current != 0){
                query = 'SELECT * FROM Tiles where id ='+tile_id+';';
                connection.query(query,function(err, rows, fields) {
                    if (err) throw err;
                    var h = rows[0].humidite +10;
                    query = 'UPDATE Tiles SET humidite = '+h+' WHERE id ='+tile_id+';';
                    connection.query(query,function(err, rows, fields) {
                        if (err) throw err;
                        var c = row[0].current - 1;
                        query = 'UPDATE Arrosoirs SET current = '+c+' WHERE user_id ='+user_id+' AND isActive = 1;';
                        connection.query(query,function(err, rows, fields) {
                            if (err) throw err;
                            callback(true);
                        });
                    });
                });
            }else{
                callback(false);
            }
        }); 
    };

    Tiles.prototype.Fertilizing = function(tile_id, user_id, callback){
        var query = 'SELECT * FROM Users where id ='+user_id+';';
        connection.query(query,function(err, row, fields) {
            if (err) throw err;
            if( typeof( row[0].nb_fertilisants ) != "undefined" && row[0].nb_fertilisants != 0){
                query = 'SELECT * FROM Tiles where id ='+tile_id+';';
                connection.query(query,function(err, rows, fields) {
                    if (err) throw err;
                    var f = rows[0].fertilite +10;
                    query = 'UPDATE Tiles SET fertilite = '+f+' WHERE id ='+tile_id+';';
                    connection.query(query,function(err, rows, fields) {
                        if (err) throw err;
                        var nb = row[0].nb_fertilisants - 1;
                        query = 'UPDATE Users SET nb_fertilisants = '+nb+' WHERE id ='+user_id+';';
                        connection.query(query,function(err, rows, fields) {
                            if (err) throw err;
                            callback(true);
                        });
                    });
                });
            }else{
                callback(false);
            }
        }); 
    };

    Tiles.prototype.Harvesting = function(tile_id, user_id, callback){
        var query = 'SELECT * FROM Plantes where tile_id ='+tile_id+' AND status >= 4;';
        connection.query(query,function(err, row, fields) {
            if (err) throw err;
            if( typeof( row[0]) != "undefined"){
                query = 'SELECT * FROM Graines_spec where id ='+row[0].graines_spec_id+';';
                connection.query(query,function(err, rows, fields) {
                    if (err) throw err;
                    var f = rows[0].fertilite +10;
                    nb_fruits = Math.ceil((row[0].health * rows[0].production)/100);

                    query = 'DELETE FROM Plantes WHERE tile_id = ' + tile_id + ';';
                    connection.query(query,function(err, r, fields) {
                        if (err) throw err;
                        connection.query('UPDATE Tiles SET sprite_id = 1, isEmpty = 0 WHERE id = '+tile_id,function(err, r, fields) {
                            if(err) throw err;
                            callback({
                                ok: true,
                                nb: nb_fruits,
                                fruit: row[0].graines_spec_id
                            });
                        });
                    });
                });
            }else{
                callback(false);
            }
        }); 
    };

    Tiles.prototype.DestroyCrops = function(user_id, tile_id, callback){
        var query = 'SELECT * FROM Plantes WHERE user_id = '+user_id+' AND tile_id = ' + tile_id + ';';
        connection.query(query,function(err, r, fields) {
            if (err) throw err;
            if(typeof(r[0]) != 'undefined'){
                query = 'DELETE FROM Plantes WHERE user_id = '+user_id+' AND tile_id = ' + tile_id + ';';
                connection.query(query,function(err, r, fields) {
                    if (err) throw err;
                    connection.query('UPDATE Tiles SET sprite_id = 1, isEmpty = 0 WHERE id = '+tile_id,function(err, r, fields) {
                        if (err) throw err;
                        callback(true);
                    });
                });
            }else{
                callback(false);
            }
        }); 
    }
    
    Tiles.prototype.DestroyBuilding = function(user_id, tile_id, callback){
        var query = 'SELECT * FROM Stockages WHERE user_id = '+user_id+' AND tile_id = ' + tile_id + ';';
        connection.query(query,function(err, r, fields) {
            if (err) throw err;
            if(typeof(r[0]) != 'undefined'){
                query = 'DELETE FROM Stockages WHERE user_id = '+user_id+' AND tile_id = ' + tile_id + ';';
                connection.query(query,function(err, r, fields) {
                    if (err) throw err;
                    connection.query('UPDATE Tiles SET sprite_id = 1, isEmpty = 0 WHERE id = '+tile_id,function(err, r, fields) {
                        if (err) throw err;
                        callback(true);
                    });
                });
            }else{
                callback(false);
            }
        }); 
    }

    Tiles.prototype.getTileInfos = function(x, y, callback){
        var query = 'SELECT * FROM Tiles WHERE x = '+x+' AND y = ' + y + ';';
        connection.query(query,function(err, rows, fields) {
            if(typeof(rows[0]) != "undefined"){
                callback(rows[0]);
            }else{
                callback(false);
            }

        });
    }

    Tiles.changeSprite = function(x,y,sprite_id){
        connection.query('UPDATE Tiles SET sprite_id = '+sprite_id+' WHERE x = '+x+' AND y = '+y, function(err,rows,fields){
            if(err) throw err;
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
