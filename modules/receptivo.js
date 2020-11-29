function Receptivo() {
    this.observers = [];
}

var singletonReceptivo = (function() {
    var instanceReceptivo = new Receptivo();

    return {
        getReceptivo: function getReceptivo() {
            return instanceReceptivo;
        }
    };
})();

Receptivo.prototype.register = function(observer) {
    this.observers.push(observer);
};

Receptivo.prototype.dispatch = function(client) {
    for (let observer of this.observers) {
        observer.dispatch(client);
    }
};

module.exports.singletonReceptivo = singletonReceptivo.getReceptivo;