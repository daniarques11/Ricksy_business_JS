const instanceCreditCard = require("../credit-card").instanceCreditCard;


test("Credit card is instanciated correctly", () => {
    let person = instanceCreditCard("Person", 1);
    expect(person).toBeDefined();
    expect(person.name).toBe("Person");
    expect(person.number).toBe(1);
    expect(person.credit).toBe(3000);
})

describe("Instances checks", () => {
    let james;
    let john;
    let jamesImpersonator;
    beforeEach(() => {
        james = instanceCreditCard("James", 111);
        john = instanceCreditCard("John", 112);
        jamesImpersonator = instanceCreditCard("James", 111);
    })
    test("Different instances are not same object", () => {
        expect(james).not.toBe(john);
        expect(james).not.toBe(jamesImpersonator);
    })
    test("Different instances have same prototype", () => {
        expect(Object.getPrototypeOf(james)).toBe(Object.getPrototypeOf(jamesImpersonator));
    })

    test("Property added to one instance isn't shared", () => {
        james.authenticity = true;
        expect(james.authenticity).toBeTruthy();
        expect(jamesImpersonator.authenticity).toBeUndefined()
    })

    test("Property added to the prototype is shared", () => {
        //Add new method to the prototype
        Object.getPrototypeOf(james).getSalute = function() {
            return `Hi, I'm ${this.name}`;
        }
        expect(james.getSalute()).toBe("Hi, I'm James");
        expect(jamesImpersonator.getSalute()).toBe("Hi, I'm James");
    })
})


describe("Paying method ", () => {
    let payer;

    //Reinstance before each test to reset the credit to 3000
    beforeEach(() => {
        payer = instanceCreditCard("Payer Man", 123);
    });
    test("Not paying if amount is more than credit", () => {
        expect(payer.pay(4000)).toBeFalsy();
        expect(payer.credit).toBe(3000);
    });
    test("Paying if amount is exact credit available", () => {
        expect(payer.pay(3000)).toBeTruthy();
        expect(payer.credit).toBe(0);
    });

    describe("Credit is 0", () => {
        //Empty the wallet (this beforeEach is executed AFTER the beforeEach from the outer scope)
        beforeEach(() => {
            payer.pay(3000);
        })
        test("Not paying any amount above 0 if credit is 0", () => {
            console.log(payer.credit)
            expect(payer.pay(1)).toBeFalsy();
            expect(payer.credit).toBe(0);
        })

        test("Able to pay 0 is credit is 0", () => {
            expect(payer.pay(0)).toBeTruthy();
            expect(payer.credit).toBe(0);
        })
    })
});