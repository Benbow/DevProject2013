var DB = require('./DB');

var Map = (function() {
    // "private" variables 
    var _longeur;
    var _DB;
    var _table = "Tiles";

    // constructor
    function Map(){
        _DB = new DB();
    };

    // add the methods to the prototype so that all of the 
    // Map instances can access the private static
    Map.prototype.getL = function() {
        return _longeur;
    };

    Map.prototype.setL = function(L) {
        _longeur = L;
    };

    Map.prototype.initialiseMap = function() { 
        var i = 0,j = 0;
        setInterval(function(){
            var connection = _DB.connection();
            connection.query('INSERT INTO Tiles (id,x,y) VALUES("","' + i + '","' + j + '");');
            if(j == 50)
            {
                if(i == 50)
                {
                    return false;
                    console.log('done');
                }
                i++;
                j=0;
            }
            j++;
        },20);
    };


    Map.prototype.saveMap = function(x,y,id) {
    
        var connection = _DB.connection();
        connection.query('UPDATE Tiles SET x=' + x + ' y=' + y + 'sprite_id=' + id + ' ;' , function(err,rows,fields){
            if(err) throw err;
        });
    };


    Map.prototype.getMap = function(callback) { 
        var connection = _DB.connection();
        var string_map = {
            'map' : '',
            'storage' : {}
        };
        connection.query('SELECT * FROM Tiles', function(err,rows,fields){
            if(err) throw err;
            var check = 0;
            for(var i = 0;i < rows.length;i++)
            {
                string_map.map += rows[i].sprite_id + ((check < 50) ? "," : ((rows[i].x == 50) ? "" : ":"));
                if(check == 50)
                {
                    check = -1;
                }
               check++;
            }
        });

        connection.query('SELECT t.x as x, t.y as y, s.id as id FROM Stockages as s LEFT JOIN Tiles as t ON s.tile_id = t.id', function(err,rows,fields){
            if(err) throw err;
            for(var i = 0;i < rows.length;i++)
            {
                string_map.storage[i] = {
                    'x': rows[i].x,
                    'y': rows[i].y,
                    'id': rows[i].id
                };
            }

            console.log(string_map);
            callback(string_map);
        });

    };

    return Map;
})();

module.exports = Map;
