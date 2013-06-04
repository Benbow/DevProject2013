var DB = require('./DB');
var User = require('./User');

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


    Map.prototype.getMap = function(user,callback) { 
        var connection = _DB.connection();
        var string_map = {
            'map' : '',
            'storage' : {},
            'user' : {},
            'all_user' : {}
        };
        var user_pseudo = 
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
        });

        connection.query('SELECT * FROM Tiles WHERE user_id = ' + user.getId() , function(err,rows,fields){
            if(err) throw err;
            string_map.user = {
                'x': rows[0].x,
                'y': rows[0].y
            };
            console.log(string_map.user);
        });

        connection.query('SELECT t.x as x, t.y as y, u.pseudo as pseudo FROM Users_Connected as uc LEFT JOIN Users as u ON uc.user_id = u.id LEFT JOIN Tiles as t ON uc.user_id = t.user_id',function(err,rows,fields){
            if(err) throw err;

            for(var i = 0;i < rows.length;i++)
            {
                if(rows[i].pseudo != user.getPseudo())
                    string_map.all_user[i] = {
                        'x': rows[i].x,
                        'y': rows[i].y,
                        'id': rows[i].id
                    };
            }

            callback(string_map);
        });

    };

    Map.prototype.getIdTile = function(x,y)
    {
        var connection = _DB.connection();
        connection.query('SELECT id FROM Tiles WHERE x = ' + x + ' AND y = ' + y, function(err,rows,fields){
            if(err) throw err;
            
            return rows[0].id;
        });
    }

    return Map;
})();

module.exports = Map;
