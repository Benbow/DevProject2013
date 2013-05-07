
DB  = require('./DB.js');




var User = (function() {
    var _id;

   /* function User(id){
        connection.query('SELECT * FROM Users WHERE id = ' + id, function(err, rows, fields) {
            if (err) throw err;

            console.log(rows[0].pseudo);
        });
    };*/


   function User(){ };

   User.prototype.getUser =  function (id)
   {

        var  db = new DB();

        db.selectRequest("*","Users","WHERE id = " + id);
        

            console.log(rows[0].pseudo);
       
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
