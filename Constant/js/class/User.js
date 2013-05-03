var User = (function() {
    var _longeur;

    function User(){
        
    };

    User.prototype.getL = function() {
        return _longeur;
    };
    User.prototype.setL = function(L) {
        _longeur = L;
    };

    return User;
})();

exports.User = function(){
	var a = new User();
	return a;
}
