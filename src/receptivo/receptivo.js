function Receptivo() {
    this.observers = [];
}

Receptivo.prototype.register = function(observer) {
    this.observers.push(observer);
};

Receptivo.prototype.dispatch = function(client) {
    for (let observer of this.observers) {
        observer.dispatch(client);
    }
};

var receptivo = (function() {
    var instanceReceptivo = new Receptivo();

    return {
        getReceptivo: function getReceptivo() {
            return instanceReceptivo;
        }
    };
})();

module.exports.receptivo = receptivo;