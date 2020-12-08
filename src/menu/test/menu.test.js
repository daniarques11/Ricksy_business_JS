const singletonMenu = require("../menu").menu;

var menu;
var client;
beforeAll(() => {
    menu = singletonMenu.getMenu();
    client = {
        name: "Client",
        pay: function(amount) {
            return true;
        }
    }
})

test("Correct initalization", () => {
    expect(menu.amount).toBeDefined();
    expect(menu.price).toBeDefined();
    expect(menu.orders).toBeDefined();
})

test("Correct dispatch", () => {
    menu.dispatch(client);
    expect(menu.amount).toBeLessThan(100);
    expect(menu.orders).toContain("Client");
})

test("Different instances are same object", () => {
    var rickMenu = singletonMenu.getMenu();
    expect(menu).toBe(rickMenu);
})