var DB = require('./DB');

var User = (function() {
    var _id;
    var _pseudo;
    var _DB = new DB();

    function User(id){
        var connection = _DB.connection();
        
    };

    User.prototype.getPseudo = function(){
        return this._pseudo;
    };

    return User;
})();

module.exports = User;
