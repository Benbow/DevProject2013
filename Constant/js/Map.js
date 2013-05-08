var DB = require('./DB');

var Map = (function() {
    // "private" variables 
    var _longeur;
    var _DB;
    var _table = "Tiles";

    // constructor
    function Map(){};

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

    Map.prototype.getMap = function() { 

    };

    return Map;
})();

module.exports = Map;
