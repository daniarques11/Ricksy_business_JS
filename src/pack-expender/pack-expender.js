/* Describes the information of a certain welcome pack expender */

function PackExpender(amount, price) {
    this.amount = amount;
    this.price = price;
}

PackExpender.prototype.dispatch = function(client) {
    if (this.amount > 0 && client.pay(this.price)) {
        this.amount -= 1;
    }
}

function instancePackExpender(amount, price) {
    return new PackExpender(amount, price);
}

module.exports.instancePackExpender = instancePackExpender;