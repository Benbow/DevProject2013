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

    Map.prototype.getMap = function(callback) { 
        var connection = _DB.connection();
        connection.query('SELECT * FROM Tiles', function(err,rows,fields){
            if(err) throw err;
            var check = 0;
            var string_map = '';
            for(var i = 0;i < rows.length;i++)
            {
                string_map += rows[i].sprite_id + ((check < 50) ? "," : ((rows[i].x == 50) ? "" : ":"));
                if(check == 50)
                {
                    check = 0;
                }
               check++;
            }
            callback(string_map);
        });
    };

    return Map;
})();

module.exports = Map;
