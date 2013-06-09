var DB = require('./DB');
var Graines_spec = require('./Graines_spec');

//Classe qui enregistre les Plantes de chaque user

var Plantes = (function() {
	var _id;                //id unique d'une arme INT
	var _croissance;        //indicateur de croissance de la plante INT
	var _health;            //indicateur de santé de la plante INT
	var _status;            //indicateur de santé de la plante INT
	var _user_id;           //lien vers l'user a qui appartient la arme INT
	var _plantes_spec_id;   //lien vers le bon type de arme INT
	var _tile_id;           //lien ver la tile de la plante INT
	var _DB;

	function Plantes(){
		_DB = new DB();
	};

	Plantes.prototype.Add_Plantes = function(croissance, health, user_id, graines_spec_id, tile_id){
		var connection = _DB.connection();

		this.setCroissance(croissance);
		this.setHealth(health);
		this.setUserId(user_id);
		this.setStatus(0);
		this.setPlantesSpecId(graines_spec_id);
		this.setTileId(tile_id);

		var query = 'INSERT INTO Plantes (croissance, health, user_id, graines_spec_id, tile_id, created_at, updated_at) VALUES ('+croissance+', '+health+', '+user_id+', '+graines_spec_id+', '+tile_id+', "'+getTimeDb()+'", "'+getTimeDb()+'");';

		connection.query(query,function(err, rows, fields) {
			if (err) throw err;
			console.log('Plantes created !');
		});

		connection.query('SELECT * FROM Plantes WHERE id = LAST_INSERT_ID();', function(err,rows,fields){
			if (err) throw err;

			_id = rows[0].id;
		});
	};

	Plantes.prototype.updatePlante = function(){
		var connection = _DB.connection();

		this.getInfosGraine(function(graine_infos){
			var refresh = setInterval(function(){
				if(_status > 5)
				{
					clearInterval(refresh);
				}
				else
				{
					_status++;
					connection.query('UPDATE Plantes SET status = '+_status+', updated_at = "'+getTimeDb()+'" WHERE id = ' + _id, function(err,rows,fields){
			            if(err) throw err;
			        });
				}
			},(graine_infos.croissance*1000));
			
		});
	};

	Plantes.prototype.getInfosGraine = function(callback){
		var connection = _DB.connection();
		var query = 'SELECT * FROM Graines_spec WHERE id = '+_plantes_spec_id;
        connection.query(query,function(err, rows, fields) {
            if (err) throw err;
            callback(rows[0]);
        });
    };

	//Getters
	Plantes.prototype.getId = function() {
		return _id;
	};
	Plantes.prototype.getCroissance = function() {
		return _croissance;
	};
	Plantes.prototype.getHealth = function() {
		return _health;
	};
	Plantes.prototype.getStatus = function() {
		return _status;
	};
	Plantes.prototype.getUserId = function() {
		return _user_id;
	};
	Plantes.prototype.getPlantesSpecId = function() {
		return _plantes_spec_id;
	};
	Plantes.prototype.getTileId = function() {
		return _tile_id;
	};


	//Setters
	Plantes.prototype.setId = function(id) {
		_id = id;
	};
	Plantes.prototype.setCroissance = function(croissance) {
		_croissance = croissance;
	};
	Plantes.prototype.setHealth = function(health) {
		_health = health;
	};
	Plantes.prototype.setStatus = function(status) {
		_status = status;
	};
	Plantes.prototype.setUserId = function(user_id) {
		_user_id = user_id;
	};
	Plantes.prototype.setPlantesSpecId = function(plantes_spec_id) {
		_plantes_spec_id = plantes_spec_id;
	};
	Plantes.prototype.setTileId = function(tile_id) {
		_tile_id = tile_id;
	};

	return Plantes;
})();

module.exports = Plantes;


getTimeDb = function(){
	var d = new Date();
	var years   = d.getFullYear(),
		month   = ((d.getMonth() + 1).toString().length > 1) ? (d.getMonth() + 1) : '0'+(d.getMonth() + 1),
		day     = ((d.getDate()).toString().length > 1) ? d.getDate() : '0'+d.getDate(),
		hours   = ((d.getHours()).toString().length > 1) ? d.getHours() : '0'+d.getHours(),
		minute  = ((d.getMinutes()).toString().length > 1) ? d.getMinutes() : '0'+d.getMinutes(),
		seconde = ((d.getSeconds()).toString().length > 1) ? d.getSeconds() : '0'+d.getSeconds();
	var db_date = years+'-'+month+'-'+day+' '+hours+':'+minute+':'+seconde;

	return db_date;
}