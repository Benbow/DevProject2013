//Classe qui enregistre les Armes de chaque user

var Armes = (function() {
    var _id;            //id unique d'une arme INT
    var _user_id;       //lien vers l'user a qui appartient la arme INT
    var _armes_spec_id; //lien vers le bon type de arme INT

    function Armes(){
        
    };

    //Getters
    Armes.prototype.getId = function() {
        return _id;
    };
    Armes.prototype.getUserId = function() {
        return _user_id;
    };
    Armes.prototype.getArmesSpecId = function() {
        return _Armes_spec_id;
    };


    //Setters
    Armes.prototype.setId = function(id) {
        _id = id;
    };
    Armes.prototype.setUserId = function(user_id) {
        _user_id = user_id;
    };
    Armes.prototype.setArmesSpecId = function(Armes_spec_id) {
        _Armes_spec_id = Armes_spec_id;
    };

    return Armes;
})();

module.exports = Armes;
