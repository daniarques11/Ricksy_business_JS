/* Describes the information of the menu
When a menu is given, the client is stored in a list*/

function Menu() {
    this.amount = 100;
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
    var singletonMenu = new Menu();

    return {
        getMenu: function getMenu() {
            return singletonMenu;
        }
    };
})();

module.exports.menu = menu;