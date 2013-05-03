var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'farmDB',
});

var User = (function() {
    var _id;
    var _pseudo;

    function User(id){
        connection.query('SELECT * FROM Users WHERE id = ' + id, function(err, rows, fields) {
            if (err) throw err;

            this._id = id;
            this._pseudo = rows[0].pseudo;
        });
    };

    User.prototype.getPseudo = function(){
        return this._pseudo;
    };

    return User;
})();

module.exports = User;
