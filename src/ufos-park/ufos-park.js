/* Stores the information of the ufos available
When an ufo is assigned to a client, that ufo is no longer available*/
function UfosPark() {
    //Not using ufos.json price. Generic cost
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

//Add dispatch method to UfosPark prototype
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

UfosPark.prototype.print = function(ufo) {
    return this.flota.has(ufo) ? `${ufo.Marca} ${ufo.Modelo}` : "No ufo";

}

/* Exported variable. 
Singleton pattern, not allowed different UfosPark objects */
var flota = (function() {
    var singletonUfosPark = new UfosPark();

    return {
        getUfosPark: function getUfosPark() {
            return singletonUfosPark;
        }
    };
})();

module.exports.flota = flota;