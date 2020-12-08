const singletonReceptivo = require("../receptivo").receptivo;

var receptivo;
beforeAll(() => {
    receptivo = singletonReceptivo.getReceptivo();
})

test("Correct initalization", () => {
    expect(receptivo.observers).toBeDefined();
})

test("Different instances are same object", () => {
    var receiver = singletonReceptivo.getReceptivo();
    expect(receiver).toBe(receptivo);
})

describe("Adding and dispatching observers", () => {
    var firstObserver;
    var secondObserver;
    beforeEach(() => {
        firstObserver = {
            dispatch: function() {}
        }
        secondObserver = {
            dispatch: function() {}
        }
    })
    test("New observers are added correctly", () => {
        receptivo.register(firstObserver);
        expect(receptivo.observers).toContain(firstObserver);
        //Adding same observer twice should work
        receptivo.register(firstObserver);
        receptivo.register(secondObserver);
        expect(receptivo.observers).toContain(secondObserver);
        expect(receptivo.observers.length).toBe(3);
    })

    test("Dispatching correctly", () => {
        //Add first twice and second once
        receptivo.register(firstObserver);
        receptivo.register(firstObserver);
        receptivo.register(secondObserver);

        //Spy observers' method dispatch
        var firstObserverSpy = jest.spyOn(firstObserver, "dispatch");
        var secondObserverSpy = jest.spyOn(secondObserver, "dispatch");
        //Run all observers dispatch
        receptivo.dispatch();
        //Expect each observer in the observers list is called once
        expect(firstObserverSpy).toHaveBeenCalledTimes(2);
        expect(secondObserverSpy).toHaveBeenCalledTimes(1);
    })
})