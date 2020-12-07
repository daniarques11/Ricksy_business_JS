const instanceCreditCard = require("../credit-card").instanceCreditCard;


test("Credit card is instanciated correctly", () => {
    let person = instanceCreditCard("Person", 1);
    expect(person).toBeDefined();
    expect(person.name).toBe("Person");
    expect(person.number).toBe(1);
    expect(person.credit).toBe(3000);
})

test("Instances are not same object", () => {
    let james = instanceCreditCard("James", 111);
    let john = instanceCreditCard("John", 112);
    let jamesImpersonator = instanceCreditCard("James", 111);
    expect(james).not.toBe(john);
    expect(james).not.toBe(jamesImpersonator);
    expect(Object.getPrototypeOf(james)).toBe(Object.getPrototypeOf(jamesImpersonator));
})

describe("Paying method tests", () => {
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