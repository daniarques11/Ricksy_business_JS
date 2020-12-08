const instancePackExpender = require("../pack-expender").instancePackExpender;
var lastPack;
var onePack;
var client;
beforeEach(() => {
    lastPack = instancePackExpender(1);
    onePack = instancePackExpender(1);
    client = {
        pay: function(amount) {
            return true;
        }
    }
})

test("Correct initalization", () => {
    expect(lastPack.amount).toBeDefined();
    expect(lastPack.price).toBeDefined();
})

test("Correct dispatch", () => {
    lastPack.dispatch(client);
    expect(lastPack.amount).toBe(0);
    expect(onePack.amount).toBe(1);
    //Not negative
    lastPack.dispatch(client);
    expect(lastPack.amount).not.toBeLessThan(0);
    expect(onePack.amount).toBe(1);
})

test("Similar instances are different objects", () => {
    expect(lastPack).not.toBe(onePack);
    expect(lastPack).toEqual(onePack);
})