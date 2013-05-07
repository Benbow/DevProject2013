var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'farmDB',
});

var DB = (function() {

    function DB(){ };

/*DB.prototype.insert = function(table,data,colum = "") {
        connection.query('INSERT INTO ' + table + '(' + colum + ') VALUES (' + data + ');', function(err, rows, fields) {
            if (err) throw err;
            console.log('insert into' + table + ' done');
        });
    };*/


    DB.prototype.selectRequest = function(champs,table,where){
        connection.query('SELECT' + champs + 'FROM' + table +  where) ;
            if (err) throw err;
            console.log('SELECT' + table + ' done');
    };

    DB.prototype.setL = function(L) {
        _longeur = L;
    };

    return DB;
});


exports.DB = function(){
    var a = new DB();
    return a;
}
