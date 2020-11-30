function PackExpender(amount) {
    this.amount = amount;
    this.price = 50;
}

function instancePackExpender(amount) {
    return new PackExpender(amount);
}

module.exports.instancePackExpender = instancePackExpender;