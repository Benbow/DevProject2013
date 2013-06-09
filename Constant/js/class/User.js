var DB = require('./DB');

var User = (function() {
    // "private" variables 
    var _id;
    var _pseudo;
    var _DB;


    // constructor
    function User(){
        _DB = new DB();
        this._id = 0;
    };


    User.prototype.loginUser = function(mail,password,callback) {
        var connection = _DB.connection();
        var userInfo = new Array();
       
        var user = connection.query('SELECT * FROM Users WHERE mail = "' + mail + '";',function(err,rows,fields){
            if(err) throw err;

            userInfo[0] = rows[0].pseudo;
            userInfo[1] = rows[0].mail;
            userInfo[2] = rows[0].password;
            userInfo[3] = rows[0].id;
            userInfo[4] = rows[0].status;
               
            callback(userInfo);             
        });
    };

    User.prototype.existMail = function(mail,callback) {
         var connection = _DB.connection();
        var newUserInfo = new Array();
       
        var user = connection.query('SELECT * FROM Users WHERE mail = "' + mail + '";',function(err,rows,fields){
            if(err) throw err;

            newUserInfo[0] = rows[0].pseudo;
            newUserInfo[1] = rows[0].mail;
           
               console.log(newUserInfo[0] + " lol " +newUserInfo[1])

        });
       
            if(newUserInfo[0] != null)
                return true;
            else 
                return false;


    };

    User.prototype.registerUser = function(mail, pseudo, password) {
        var connection = _DB.connection();
        var newUserInfo = new Array();
        var newUser = connection.query('INSERT INTO Users (id,pseudo,password,mail) VALUES ("","' + pseudo + '","' + password + '","' + mail + '");',function(err,row,fields){
            if(err) throw err;

             
        });

    };

    User.prototype.SellCrop = function(id, prix, callback) {
        var connection = _DB.connection();
        var query = 'SELECT * FROM Users WHERE id = ' + id;
        connection.query(query,function(err, rows, fields) {
            if(err) throw err;
            if(typeof (rows[0]) != "undefined"){
                prix = rows[0].argent + prix;
                var query = 'UPDATE Users SET argent = '+prix+' WHERE id = ' + id;
                connection.query(query,function(err, rows, fields) {
                    if(err) throw err;
                    callback(true);
                });
            }else{
                callback(false);
            }
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

    User.prototype.move = function(x,y){
        var connection = _DB.connection();

        connection.query('UPDATE Tiles SET user_id = NULL WHERE user_id = ' + this._id, function(err,rows,fields){
            if(err) throw err;
        });
        connection.query('UPDATE Tiles SET user_id = ' + this._id + ' WHERE x = ' + x + ' AND y = ' + y, function(err,rows,fields){
            if(err) throw err;
        });

        console.log('test move');
    };

    User.prototype.connected = function(){
        var connection = _DB.connection();

        var d = new Date();
        var datetime = d.getFullYear()+'-'+(d.getMonth() + 1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
        var id = this._id;

        connection.query('SELECT * FROM Users_Connected WHERE user_id = '+this._id,function(err,rows,fields){
            if(err) throw err;

            if(rows.length > 0)
            {        
                connection.query('UPDATE Users_Connected SET isConnected = 1 WHERE user_id = '+id, function(err,rows,fields){
                    if(err) throw err;
                });
            }
            else
            {
                connection.query('INSERT INTO Users_Connected VALUE ("",'+ id +',1,0,"'+ datetime +'")', function(err,rows,fields){
                    if(err) throw err;
                });
            }     
        });
    };

    User.prototype.disconnect = function(){
        var connection = _DB.connection();
        connection.query('UPDATE Users_Connected SET isConnected = 0 WHERE user_id = '+this._id, function(err,rows,fields){
            if(err) throw err;
        });
    };

    User.prototype.attack = function(tile_id){
        var connection = _DB.connection();
        connection.query('UPDATE Tiles SET owner = '+ this._id +' WHERE id = '+ tile_id, function(err,rows,fields){
            if(err) throw err;
        });
    };

    return User;
})();

module.exports = User;
