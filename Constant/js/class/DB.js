var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'farmDB',
});

var DB = (function() {
    var connect;

    function DB(){
        connect = connection;
    };

    DB.prototype.connection = function(){
        return connect;
    };

    DB.prototype.insert = function(table,colum,data) {
        connection.query('INSERT INTO ' + table + ' ' + colum + ' VALUES ' + data + ';', function(err, rows, fields) {
            if (err) throw err;
            console.log('insert into' + table + ' done');
        });
    };

    DB.prototype.selectRequest = function(champs,table,where){
        if(where == '')
            where = '1=1';
        connection.query('SELECT ' + champs + ' FROM ' + table  + ' WHERE ' +  where, function(err, rows, fields) {
            if (err) throw err;
           
            console.log('SELECT in ' + table + ' ok');
            console.log(rows.length);

            return rows;
        });

    };

    return DB;
})();

module.exports = DB;
