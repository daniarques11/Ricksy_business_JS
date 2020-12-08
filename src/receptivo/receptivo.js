/*Stores observers. Dispatches a client with all the observers when it is required*/
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
    var singletonReceptivo = new Receptivo();

    return {
        getReceptivo: function getReceptivo() {
            return singletonReceptivo;
        }
    };
})();

module.exports.receptivo = receptivo;