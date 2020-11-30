function UfosPark() {
    this.fee = 500;
    this.flota = new Map();
}

UfosPark.prototype.add = function(ufo) {
    if (!(this.flota.has(ufo))) {
        this.flota.set(ufo, null);
    }
}

UfosPark.prototype.getUfoOf = function(cardNumber) {
    for (let entry of this.flota.entries()) {
        if (entry[1] == cardNumber) return entry[0];
    }
    return null;
}

//Añadir metodo dispatch al prototip de UfosPark
UfosPark.prototype.dispatch = function(client) {
    let assignUfo;
    if (Array.from(this.flota.values()).indexOf(client.number) == -1) {
        for (let entry of this.flota.entries()) {
            if (entry[1] == null) {
                assignUfo = entry;
                break;
            }
        }
    }
    if (assignUfo != null && client.pay(this.fee)) {
        this.flota.set(assignUfo[0], client.number);
    }
}

/* Exported variable. 
Singleton pattern, not allowed different UfosPark objects */
var flota = (function() {
    var ufosParkInstance = new UfosPark();

    return {
        getUfosPark: function getUfosPark() {
            return ufosParkInstance;
        }
    };
})();

module.exports.flota = flota;