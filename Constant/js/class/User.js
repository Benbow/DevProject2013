var DB = require('./DB');

var User = (function() {
    // "private" variables 
    var _id;
    var _pseudo;
    var _DB;


    // constructor
    function User(){
        _DB = new DB();
    };


    User.prototype.loginUser = function(mail,password,callback) {
        var connection = _DB.connection();
        var userInfo = new Array();
       
        var user = connection.query('SELECT * FROM Users WHERE mail = "' +  mail + '";',function(err,rows,fields){
            if(err) throw err;

            userInfo[0] = rows[0].pseudo;
            userInfo[1] = rows[0].mail;
            userInfo[2] = rows[0].password;
            userInfo[3] = rows[0].id;
            userInfo[4] = rows[0].status;
               
            callback(userInfo);             
        });
    };

    User.prototype.registerUser = function(mail, pseudo, password) {
        var connection = _DB.connection();
        var newUserInfo = new Array();
        var newUser = connection.query('INSERT INTO Users (id,pseudo,password,mail) VALUES ("","' + pseudo + '","' + password + '","' + mail + '");',function(err,row,fields){
            if(err) throw err;

             
        });

    };

    User.prototype.getPseudo = function(){
        return this._pseudo;
    };

    User.prototype.setPseudo = function(pseudo){
        this._pseudo = pseudo;
    };

    User.prototype.getId = function(){
        return this._id;
    };

    User.prototype.setId = function(id){
        this._id = id;
    };

    return User;
})();

module.exports = User;
