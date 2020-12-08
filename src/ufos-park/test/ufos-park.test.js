const singletonUfosPark = require("../ufos-park").flota;

var ufosPark;
var firstClient;
var secondClient;
beforeAll(() => {
    ufosPark = singletonUfosPark.getUfosPark();

    firstClient = {
        number: 123,
        pay: function(amount) {
            return true;
        }
    }
    secondClient = {
        number: 124,
        pay: function(amount) {
            return true;
        }
    }
})

beforeEach(() => {
    ufosPark.add("unx");
})

test("Correct initalization", () => {
    expect(ufosPark.fee).toBeDefined();
    expect(ufosPark.flota).toBeDefined();
})

test("Not adding existing ufo", () => {
    ufosPark.add("unx");
    expect(ufosPark.flota.size).toBe(1);
})

test("Different instances are same object", () => {
    var ufosStation = singletonUfosPark.getUfosPark();
    expect(ufosStation).toBe(ufosPark);
})

describe("Dispatch method", () => {
    var thirdClient;
    var notPayingClient;

    beforeAll(() => {
        notPayingClient = {
            number: 125,
            pay: function(amount) {
                return false;
            }
        }
        thirdClient = {
            number: 126,
            pay: function(amount) {
                return true;
            }
        }
    })

    beforeEach(() => {
        ufosPark.add("dox");
    })

    afterEach(() => {
        ufosPark.flota = new Map();
    })

    test("Adding clients correcty", () => {
        //Adding a client
        ufosPark.dispatch(firstClient);
        expect(ufosPark.flota.get("unx")).toBe(firstClient.number);
        //Not adding same client twice
        ufosPark.dispatch(firstClient);
        expect(ufosPark.flota.get("dox")).not.toBe(firstClient.number);
        //Not adding client not paying
        ufosPark.dispatch(notPayingClient);
        expect(ufosPark.flota.get("dox")).not.toBe(notPayingClient.number);
        //Adding another client
        ufosPark.dispatch(secondClient);
        expect(ufosPark.flota.get("dox")).toBe(secondClient.number);
        //Not adding client if no ufos left
        ufosPark.dispatch(thirdClient);
        expect(ufosPark.getUfoOf(thirdClient.number)).toBeNull();
    })

    test("GetUfoOf method", () => {
        ufosPark.dispatch(firstClient);
        expect(ufosPark.getUfoOf(firstClient.number)).toBe("unx");
    })
})