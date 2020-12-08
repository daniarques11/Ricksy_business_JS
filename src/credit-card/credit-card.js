/* Describes the information of a client who owns a credit card. Allows them to pay if there's credit left*/
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

// Exported method. Allows multiple CreditCard creations 
function instanceCreditCard(name, number) {
    return new CreditCard(name, number);
}

module.exports.instanceCreditCard = instanceCreditCard;