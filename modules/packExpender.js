function PackExpender(amount) {
    this.amount = amount;
    this.price = 50;
}

function instancePackExpender(amount) {
    var pack = new PackExpender(amount);

    return pack;
}

module.exports.instancePackExpender = instancePackExpender;