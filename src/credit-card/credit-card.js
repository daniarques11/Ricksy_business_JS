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
    return new CreditCard(name, number);
}

module.exports.instanceCreditCard = instanceCreditCard;