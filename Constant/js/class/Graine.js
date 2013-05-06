var Graines = (function() {
    var _id;
    var _nb;
    var _user_id;
    var _graines_spec_id;

    function Graines(){
        
    };

    Graines.prototype.getL = function() {
        return _longeur;
    };
    Graines.prototype.setL = function(L) {
        _longeur = L;
    };

    return Graines;
})();

exports.Graines = function(){
	var a = new Graines();
	return a;
}
