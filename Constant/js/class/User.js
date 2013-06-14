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

        });
       
            if(newUserInfo[0] != null)
                return true;
            else 
                return false;
    };

    User.prototype.combat = function(user_id,enemi, callback) {
        var connection = _DB.connection();
        this.getArmeInfos(user_id,function(infos_user_arme){
            connection.query('SELECT spec.`puissance`, spec.`precision`, spec.`vitesse` FROM `Armes_spec` as spec LEFT JOIN Armes as arme ON spec.id = arme.armes_spec_id WHERE arme.user_id = '+ enemi,function(err,rows,fields){
                if (err) throw err;
                var infos_enemi_arme = rows[0];
                console.log('enemi : '+user_id);
                connection.query('SELECT spec.resistance as health, user.id as id FROM `Users_level_spec` as spec LEFT JOIN Users as user ON spec.id = user.niveau WHERE user.id = '+ user_id +' OR user.id = '+enemi,function(err,rows,fields){
                    if (err) throw err;

                    if (user_id == rows[0].id) {
                        infos_user_arme.health = rows[0].health;
                        infos_enemi_arme.health = rows[1].health;
                    }
                    else {
                        infos_user_arme.health = rows[1].health;
                        infos_enemi_arme.health = rows[0].health;
                    }
                    console.log(infos_user_arme);
                    console.log(infos_enemi_arme);

                    var user_combat = setInterval(function(){
                        if(infos_enemi_arme.health == 0 || infos_user_arme.health == 0){
                            clearInterval(user_combat);
                            if(infos_enemi_arme.health == 0)
                                callback(true);
                            else
                                callback(false);
                        }
                        else {
                            var random = Math.floor((Math.random()*100)+1);
                            if(random < infos_user_arme.precision) {
                                console.log('user touche');
                                infos_enemi_arme.health -= infos_user_arme.puissance;
                            }
                        }
                    },infos_user_arme.vitesse*1000);

                    var enemi_combat = setInterval(function(){
                        if(infos_enemi_arme.health == 0 || infos_user_arme.health == 0){
                            clearInterval(enemi_combat);
                            if(infos_enemi_arme.health == 0)
                                callback(true);
                            else
                                callback(false);
                        }
                        else {
                            var random = Math.floor((Math.random()*100)+1);
                            if(random < infos_enemi_arme.precision) {
                                console.log('enemi touche');
                                infos_user_arme.health -= infos_enemi_arme.puissance;  
                            }                          
                        }
                    },infos_enemi_arme.vitesse*1000);
                    
                });
            });
        });
    };



    User.prototype.getArmeInfos = function(callback) {
        var connection = _DB.connection();
        connection.query('SELECT spec.`puissance` as puissance, spec.`precision` as precision, spec.`vitesse` as vitesse FROM `Armes_spec` as spec LEFT JOIN Armes as arme ON spec.id = arme.armes_spec_id WHERE arme.user_id = '+ _id,function(err,rows,fields){
            if (err) throw err;
            callback(rows[0]);
        });
    };

    User.prototype.registerUser = function(mail, pseudo, password) {
        var connection = _DB.connection();
        var newUserInfo = new Array();
        var newUser = connection.query('INSERT INTO Users (id,pseudo,password,mail) VALUES ("","' + pseudo + '","' + password + '","' + mail + '");',function(err,row,fields){
            if(err) throw err;

             
        });

    };

     User.prototype.checkArgent = function(id, nb, prix, callback) {
        var connection = _DB.connection();
        var argentUser = connection.query('SELECT argent FROM Users WHERE id = ' + id + ';',function(err,row,fields){
            if(err) throw err;
                var sommes =nb*prix;
                console.log("looooooooooooool"+sommes);
                if(argentUser < sommes){
                     callback(false); 
                }else{
                     callback(true); 
                }
             
        });

    };

    User.prototype.buy_graines = function(nb,graines_spec_id, id, callback) {
        var connection = _DB.connection();
        var prix;
        var sommes
        var query ='SELECT prix  FROM Graines_spec WHERE id ='+graines_spec_id;
        connection.query(query, function(err,row,fields){
            if(err) throw err;
                if(typeof (row[0]) != "undefined"){
                    prix = row[0].prix;
                    sommes =nb*prix;
                    connection.query('SELECT argent FROM Users WHERE id = ' + id + ';',function(err,row,fields){
                    if(err) throw err;
                    console.log(row[0].argent +" et " + sommes);
                    if(row[0].argent >= sommes){                                                         
                       var query = 'UPDATE  Users SET argent = argent-'+nb*prix+' WHERE id = ' + id;
                        connection.query(query, function(err,row,fields){
                        if(err) throw err;
                        callback(true);
                     
                        });
                    }else{
                        console.log("t'es un pauvre");
                        callback(false);
                    }
                });
            }                     
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

    User.prototype.conquet = function(tile_id){
        var connection = _DB.connection();
        var id = this._id; 
        connection.query('UPDATE Tiles SET owner = '+ id +' WHERE id = '+tile_id+';', function(err,rows,fields){
            if(err) throw err;         
        });
    };

    User.prototype.updateLevel = function(nb, callback){
        var connection = _DB.connection();
        var id = this._id; 
        connection.query('SELECT uspec.tile_next_level, u.niveau, u.experience FROM Users AS u LEFT JOIN Users_level_spec AS uspec ON u.niveau = uspec.id WHERE u.id = '+id+';', function(err,rows,fields){
            if(err) throw err;
            connection.query('UPDATE Users SET experience = experience+'+nb+' WHERE id='+id+';', function(err,row,fields){
                if(err) throw err;
            });
            if(rows[0].experience+nb >= rows[0].tile_next_level){
                connection.query('UPDATE Users SET niveau = niveau+1 WHERE id = '+id+';', function(err,row,fields){
                    if(err) throw err;
                    callback(true);
                });
            }else{
                callback(true);
            }
        });
    };

    User.prototype.checkLevel=function(callback){
        var connection = _DB.connection();
        var id = this._id; 
        connection.query('SELECT uspec.tile_next_level, u.niveau, u.experience FROM Users AS u LEFT JOIN Users_level_spec AS uspec ON u.niveau = uspec.id WHERE u.id = '+id+';', function(err,rows,fields){
            if(err) throw err;
            if(rows[0].experience >= rows[0].tile_next_level){
                connection.query('UPDATE Users SET niveau = niveau+1 WHERE id = '+id+';', function(err,row,fields){
                    if(err) throw err;
                    callback(true);
                });
            }else{
                callback(true);
            }
        });
    }

    User.prototype.checkNbMaxTile = function(nb, callback){
        var connection = _DB.connection();
        var id = this._id; 
        connection.query('SELECT uspec.tile_max FROM Users AS u LEFT JOIN Users_level_spec AS uspec ON u.niveau = uspec.id WHERE u.id = '+id+';', function(err,rows,fields){
             if(err) throw err;
             if(rows[0].tile_max > nb){
                callback(true);
             }else{
                callback(false);
             }
        });
    };

    User.prototype.checkAlliance = function(callback){
        var connection = _DB.connection();
        var id = this._id;
        connection.query('SELECT alliance_id FROM Users WHERE id ='+id+';', function(err, rows, fields){
            if(err) throw err;
            if(rows[0].alliance_id == null){
                callback(true);
            }else{ 
                callback(false);
            }
        });
    };

    User.prototype.enterAlliance = function(invit_id, alliance_id, callback){
        var connection = _DB.connection();
        var id = this._id;
        console.log(alliance_id);
        var query = 'DELETE FROM Alliance_invit WHERE id='+invit_id+';';
        connection.query(query,function(err, rows, fields) {
            if (err) throw err;
            query = 'Update Users SET alliance_id = '+alliance_id+' WHERE id ='+id+';';
            connection.query(query,function(err, rows, fields) {
                if (err) throw err;
                callback(true);
            });
        });
    };

    User.prototype.quitAlliance = function(callback){
        var connection = _DB.connection();
        var id = this._id;
        connection.query('UPDATE Users SET alliance_id = NULL WHERE id='+id+';', function(err, rows, fields){
            callback(true);
        });
    };

    User.prototype.checkName = function(name, callback){
        var connection = _DB.connection();
        var id = this._id;
        connection.query('SELECT * FROM Users WHERE pseudo = "'+name+'";', function(err, rows, fields){
            if(err) throw err;
            if(rows[0] != null){
                callback(rows[0]);
            }else{
                callback(false);
            }
        });
    };

    User.prototype.getTimerConquet = function(callback){
        var connection = _DB.connection();
        connection.query('SELECT uspec.conquete_timer as conquete_timer FROM Users_level_spec as uspec LEFT JOIN Users as u ON u.niveau = uspec.id WHERE u.id='+this._id, function(err,rows,fields){
            if(err) throw err;
            callback(rows[0].conquete_timer);
        });
    };

    User.prototype.checkMoneyForStockages = function(user_id, stockage_spec_id, callback){
        var connection = _DB.connection();
        var query = "SELECT * FROM Users WHERE id ="+user_id+";";
        connection.query(query, function(err, rows, fields){
            if(err) throw err;
            query = 'SELECT * FROM Stockages_spec WHERE id ='+stockage_spec_id+';';
            connection.query(query, function(err, row, fields){
                if(err) throw err;
                if(rows[0].argent >=row[0].prix){
                    callback(true);
                }else{
                    callback(false);
                }
            });
        });
    };

    User.prototype.GetUserProps = function(user_id, callback){
        var connection = _DB.connection();
        var query = "SELECT * FROM Users AS u LEFT JOIN Users_level_spec AS uspec ON u.niveau = uspec.id WHERE u.id = "+user_id+";";
        connection.query(query, function(err, rows, fields){
            if(err) throw err;
            query = 'SELECT * FROM Arrosoirs WHERE user_id = '+user_id+' AND isActive = 1;';
            connection.query(query, function(err, row, fields){
                if(err) throw err;
                if(rows[0].alliance_id != null){
                    query = 'SELECT * FROM Alliances WHERE id = '+rows[0].alliance_id+';';
                    connection.query(query, function(err, ro, fields){
                        if(err) throw err;
                        if(typeof(ro[0])!= 'undefined'){
                           callback({
                                level : rows[0].niveau,
                                water : row[0].current,
                                fertilisant : rows[0].nb_fertilisants,
                                energie : rows[0].energies,
                                argent : rows[0].argent,
                                xp : rows[0].experience,
                                next : rows[0].tile_next_level,
                                max : rows[0].tile_max,
                                alliance : ro[0].name,
                                alliance_id : ro[0].id
                            }); 
                       }else{
                            callback({
                                level : rows[0].niveau,
                                water : row[0].current,
                                fertilisant : rows[0].nb_fertilisants,
                                energie : rows[0].energies,
                                argent : rows[0].argent,
                                xp : rows[0].experience,
                                next : rows[0].tile_next_level,
                                max : rows[0].tile_max,
                                alliance : 'Undefined',
                                alliance_id : null
                            });
                       }    
                    });
                }else{
                    callback({
                        level : rows[0].niveau,
                        water : row[0].current,
                        fertilisant : rows[0].nb_fertilisants,
                        energie : rows[0].energies,
                        argent : rows[0].argent,
                        xp : rows[0].experience,
                        next : rows[0].tile_next_level,
                        max : rows[0].tile_max,
                        alliance : 'None',
                        alliance_id : null
                    });
                }
            });
        });
    };

    User.prototype.lvl = function()
    {
        var connection = _DB.connection();
       // var lvl = new Array();
        var i                    = 1;
        var tile_next            = 1;
        var conque_timer         = 5;
        var _wait_conquete_timer = 8;
        var _resistance          = 50;
        var _victory_timer       = 15;
        var _win_regen           = 1;

    
        while (i != 50)
        {
            //connection.query('INSERT INTO Users_level_spec VALUES ('+i+', '+tile_next+', '+conque_timer+', '+_wait_conquete_timer+', '+_resistance+','+_victory_timer+', '+_win_regen+')', function(err, rows, fields){if (err) throw err; });
            var query = 'INSERT INTO Users_level_spec (id, tile_next_level, conquete_timer, wait_conquetes_timer, resistance, victory_timer, win_regen)VALUES ('+i+', '+tile_next+', '+conque_timer+', '+_wait_conquete_timer+', '+_resistance+','+_victory_timer+', '+_win_regen+') ';
            connection.query(query,function(err, rows, fields){if(err) throw err;});
            tile_next            = Math.ceil(tile_next * (1.1));
            conque_timer         = Math.ceil(conque_timer * (1.15));
            _wait_conquete_timer = Math.ceil(_wait_conquete_timer * (1.15));
            _resistance          = Math.ceil(_resistance * (1.2));
            _victory_timer       = Math.ceil(_victory_timer * (1.1));
            _win_regen           = Math.ceil(_win_regen * (1.1));
            i++;           
                console.log ('la ca fonctionne bordel');
        }
        console.log ('la ca fonctionne aussi putin');
    }

    User.prototype.next_lvl = function(id)
    {
        /*var connection = _DB.connection();
        var lvl_now = connection.query('SELECT niveau, experience FROM Users WHERE id = ' + _id);

        var exp = connection.query('SELECT experience, experience FROM Users WHERE id = ' + _id);
        var next_lvl = connection.query('SELECT tile_next_level FROM Users_level_spec WHERE id = ' + _id );
        
    
        if(lvl [lvl_now] ==)
        {
             Math.ceil(coef * 1.7;
        }*/
    }
    return User;
})();

module.exports = User;
