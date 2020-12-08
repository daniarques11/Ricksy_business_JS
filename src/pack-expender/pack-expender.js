function PackExpender(amount) {
    this.amount = amount;
    this.price = 50;
}

PackExpender.prototype.dispatch = function(client) {
    if (this.amount > 0 && client.pay(this.price)) {
        this.amount -= 1;
    }
}

function instancePackExpender(amount) {
    return new PackExpender(amount);
}

module.exports.instancePackExpender = instancePackExpender;