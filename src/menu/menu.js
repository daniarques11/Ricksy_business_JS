/* Describes the information of the menu
When a menu is given, the client is stored in a list*/

function Menu(amount, price) {
    this.amount = amount;
    this.price = price;
    this.orders = [];
}

Menu.prototype.dispatch = function(client) {
    if (this.amount > 0 && client.pay(this.price)) {
        this.amount -= 1;
        this.orders.push(client.name);
    }
}

var menu = (function() {
    //Use the menu we desire from the JSON
    const menuSelected = require("../../static/json/menus.json").España.menu1;
    var singletonMenu = new Menu(parseInt(menuSelected.stck), parseInt(menuSelected.price));

    return {
        getMenu: function getMenu() {
            return singletonMenu;
        }
    };
})();

module.exports.menu = menu;