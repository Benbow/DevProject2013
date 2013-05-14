//Classe qui enregistre les Alliances de chaque user

var Alliances = (function() {
    var _id;                //id unique d'une alliance INT
    var _name;              //nom de l'alliances String
    var _master_user_id;    //lien vers le user maitre de l'alliance INT

    function Alliances(){
        
    };

    //Getters
    Alliances.prototype.getId = function() {
        return _id;
    };
    Alliances.prototype.getName = function() {
        return _name;
    };
    Alliances.prototype.getMasterUserId = function() {
        return _master_user_id;
    };


    //Setters
    Alliances.prototype.setId = function(id) {
        _id = id;
    };
    Alliances.prototype.setName = function(name) {
        _name = name;
    };
    Alliances.prototype.setMasterUserId = function(master_user_id) {
        _master_user_id = master_user_id;
    };

    return Alliances;
})();

exports.Alliances = function(){
	var a = new Alliances();
	return a;
}
