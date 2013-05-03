var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'farmDB',
});

var User = (function() {
    var _id;

    function User(id){
        connection.query('SELECT * FROM Users WHERE id = ' + id, function(err, rows, fields) {
            if (err) throw err;

            console.log(rows[0].pseudo);
        });
    };

    User.prototype.getL = function() {
        return _longeur;
    };
    User.prototype.setL = function(L) {
        _longeur = L;
    };

    return User;
})();

exports.User = function(id){
	var a = new User(id);
	return a;
}
