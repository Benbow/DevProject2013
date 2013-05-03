var Map = (function() {
    // "private" variables 
    var _longeur;

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

    return Map;
})();

exports.Map = function(){
	var a = new Map();
	return a;
}
