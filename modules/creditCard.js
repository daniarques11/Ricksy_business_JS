function CreditCard(name, number) {
    this.name = name;
    this.number = number;
    this.credit = 3000;
}
CreditCard.prototype.pay = function(amount) {
    if (amount <= this.credit) {
        this.credit -= amount;
        return true;
    } else {
        return false;
    }
}

/* Exported method. Allows multiple CreditCard creations */
//TODO: return directly without declaring var card
function instanceCreditCard(name, number) {
    var card = new CreditCard(name, number);

    return card;
}

console.log(instanceCreditCard);
module.exports.instanceCreditCard = instanceCreditCard;
console.log(module.exports);