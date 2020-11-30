function Menu(amount) {
    this.amount = amount;
    this.price = 100;
    this.orders = [];
}

Menu.prototype.dispatch = function(client) {
    if (this.amount > 0 && client.pay(this.price)) {
        this.amount -= 1;
        this.orders.push(client.name);
    }
}

var menu = (function() {
    var instanceMenu = new Menu(100);

    return {
        getMenu: function getMenu() {
            return instanceMenu;
        }
    };
})();

module.exports.menu = menu;