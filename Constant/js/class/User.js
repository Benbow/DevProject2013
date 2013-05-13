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
                           
                for(var i = 0;i < rows.length;i++)
                    {
                        userInfo[0] = rows[i].pseudo;
                        userInfo[1] = rows[i].mail;
                        userInfo[2] = rows[i].password;
                    }
               
                 callback(userInfo);             
            });
      };

    User.prototype.getPseudo = function(){
        return this._pseudo;
    };

    return User;
})();

module.exports = User;
