/**
 * Ricksy Business
 * ===============
 * Rick se queda a cargo Morty y Summer, 
 * y celebra una pedazo de fiesta. 
 * Entre los invitados hay adolescentes, aliens, 
 * Gearhead, Squanchy, Birdpearson y 
 * Abradolph Lincler (una combinación de DNA
 * de Adolf Hitler y Abraham Lincoln).
 * 
 * Cuando un invitado/a llega a la fiesta, 
 * se le da de alta en el receptivo del sistema
 * mediante su tarjeta de crédito.
 * 
 * El receptivo carga en el crédito de la tarjeta:
 * - El coste del UberOvni de vuelta a casa
 * - El coste del pack de bienvenida (Collaxion crystals).
 * 
 * El componente de reserva de Ovnis y el componente
 * de entrega del pack de bienvenida observan al
 * componente receptivo, de modo que cuando el receptivo
 * da de alta a un invitado/a automáticamente cargan 
 * en la tarjeta del invitado/a el coste de ambos servicios. 
 */
/**
 * Crea una tarjeta de crédito para Abradolph.
 * Como es una AndromedanExpress
 * el crédito inicial es de 3000 EZIS
 */
function defineCreditCard(name, number) {
    var record = {
        name: name,
        number: number,
        credit: 3000
    }

    var publicAPI = {
        pay,
        getNumber,
        getName,
        getCredit,
        toString
    }

    return publicAPI;

    function pay(amount) {
        if (amount <= record.credit) {
            record.credit -= amount;
            return true;
        } else {
            return false;
        }
    }

    function getNumber() {
        return record.number;
    }

    function getName() {
        return record.name;
    }

    function getCredit() {
        return record.credit;
    }

    function toString() {
        return "Name: " + record.name + ", Number: " + record.number + ", Credit: " + record.credit;
    }
}
var abradolph = defineCreditCard("Abradolph Lincler", "4916119711304546");

console.log("\n" + "Tarjeta de Abradolph" + "\n" +
    "====================");
console.log(abradolph.toString());

/**
 * Construye el componente de reserva de Ovnis.
 * Recibe el objeto tarjeta de crédito del invitado/a
 * en el método dispatch(card)
 * y realiza un cargo a la tarjeta.
 * Si hay saldo suficiente se reserva un UberOvni
 * de los que estén libres.
 * El coste del ovni es de 500 EZIs.
 */

// Da de alta en la flota de ovnis 2 UFOS.
var UfosPark = (function defineUfosPark() {
    var record = {
        fee: 500,
        flota: {}
    };

    var publicAPI = {
        add,
        getUfoOf,
        dispatch,
        getFlota
    }

    return publicAPI;

    function add(ufo) {
        if (!(ufo in record.flota)) {
            record.flota[ufo] = null;
        }
    }

    function getUfoOf(cardNumber) {
        let ufoID = null;
        if (Object.values(record.flota).indexOf(cardNumber) > -1) {
            for (let ufo of Object.keys(record.flota)) {
                if (record.flota[ufo] == cardNumber) {
                    ufoID = ufo;
                    break;
                }
            }
        }
        return ufoID;
    }

    function dispatch(client) {
        let assignUfo;
        if (Object.values(record.flota).indexOf(client.getNumber()) == -1) {
            for (let ufo of Object.keys(record.flota)) {
                if (record.flota[ufo] == null) {
                    assignUfo = ufo;
                    break;
                }
            }
        }
        if (assignUfo != null && client.pay(record.fee)) {
            record.flota[assignUfo] = client.getNumber();
        }
    }

    function getFlota() {
        return record.flota;
    }
})();
var ufosID = ["unx", "dox"];
for (let ufo of ufosID) {
    UfosPark.add(ufo);
}

console.log(UfosPark);


UfosPark.dispatch(abradolph);
// Mostramos el ID del ovni asignado a Abradolph
console.log("\nOvni de Abradolph" + " \n" +
    "=================");
console.log(UfosPark.getUfoOf(abradolph.getNumber()) + "\n");

// Mostramos el credito de la tarjeta del cliente
console.log("Credito de Abradolph: " + abradolph.getCredit());

// Procesamos el pago y reserva de ovni de Abradolph


// La dualidad en Abradolph quiere reservar otro ovni.
// El sistema detecta que ya tiene uno 
// e ignora la petición.

console.log("\nAbradolph quiere otro ovni\n" +
    "==========================");
UfosPark.dispatch(abradolph);
console.log("Su credito no ha cambiado: " + abradolph.getCredit());
console.log("Ovni de Abradolph: " + UfosPark.getUfoOf(abradolph.getNumber()));

// A GearHead le vacía la tarjeta el alien "Cámara Lenta" 
// mientras le daba la chapa, justo antes de pagar el ovni.
// Intenta reservarlo y el componente de reserva de ovnis
// no le asigna ninguno.

console.log("\nLLega GearHead!\n" +
    "===============");
var gearHead = defineCreditCard("Gearhead", "8888888888888888");


gearHead.pay(3000); // le vacían la cartera

UfosPark.dispatch(gearHead);
console.log("Su credito es cero: " + gearHead.getCredit());
console.log("No puede reservar ovni: " + UfosPark.getUfoOf(gearHead.getNumber()));

// Squanchy deja su ovni reservado
// antes de irse a squanchear

console.log("\nLLega Squanchy!\n" +
    "==============");
var squanchy = defineCreditCard("Squanchy", "4444444444444444");

UfosPark.dispatch(squanchy);
console.log("Su credito es: " + squanchy.getCredit());
console.log("Su ovni es: " + UfosPark.getUfoOf(squanchy.getNumber()));

// Morty quiere un ovni para huir de la fiesta
// pero ya no queda ninguno disponible

console.log("\nAlgun ovni para Morty?\n" +
    "======================");
var morty = defineCreditCard("Morty", "0000000000000000");
UfosPark.dispatch(morty);
console.log("Su credito no ha cambiado: " + morty.getCredit());
console.log("No hay ovni Morty: " + UfosPark.getUfoOf(morty.getNumber()));

// Metemos un ovni más en la flota de ovnis
// y mostramos la flota por consola

console.log("\nFlota de ovnis\n" +
    "==============");
UfosPark.add("trex");
console.log(UfosPark.getFlota());


/**
 * Construye el dispensador de packs de bienvenida.
 * Indica el numero de unidades y el coste de cada
 * uno de ellos, que es de 50 EZIs
 */

function definePackExpender(amount, price) {
    var record = {
        amount: amount,
        price: price
    }

    var publicAPI = {
        dispatch,
        getAmount
    }

    return publicAPI;

    function dispatch(client) {
        if (record.amount > 0 && client.pay(record.price)) {
            record.amount -= 1;
        }
    }

    function getAmount() {
        return record.amount;
    }
}
var PackExpender = definePackExpender(3, 50);

// Muestra el total de packs y su precio unidad
console.log("\nPacks\n" +
    "=====");
console.log(PackExpender.getAmount());

// Abradolph compra su pack de bienvenida
PackExpender.dispatch(abradolph);

console.log("\nAbradolph compra su pack\n" +
    "========================");
console.log("Packs\n" + PackExpender.getAmount());
console.log("Credito de Abradolph: " + abradolph.getCredit());

// El pobre GerHead no tiene crédito para comprar su pack
console.log("\nGearHead sin credito para su pack\n" +
    "=================================");
PackExpender.dispatch(gearHead);
console.log("Packs\n" + PackExpender.getAmount());
console.log("Credito de GearHead: " + gearHead.getCredit());


/**
 * Vamos a automatizar ahora ambas tareas, de modo que
 * cuando llega un invitado/a se le asiga un ovni
 * y un pack y se realiza el cargo a la tarjeta.
 * 
 * Para ello, crea el componente receptivo
 * y registra (añade) los componentes UfosPark
 * y CrystalDispatcher al receptivo
 */

var receptivo = (function defineReceptivo() {
    var observers = [];

    var publicAPI = {
        register,
        dispatch
    }

    return publicAPI;

    function register(observer) {
        observers.push(observer);
    }

    function dispatch(client) {
        for (let observer of observers) {
            observer.dispatch(client);
        }
    }
})();
receptivo.register(PackExpender);
receptivo.register(UfosPark);

// Implementa el metodo receptivo.dispatch()
// para que invoque a UfosPark.dispatch()
// y a CrystalExpender.dispatch()

// Squanchy reserva ovni (ya tiene) y pack

console.log("\nLLega Squanchy!\n" +
    "===============");
receptivo.dispatch(squanchy);

function mostrarReserva(client) {
    console.log(client.toString());
    console.log("Packs: " + PackExpender.getAmount());
    console.log("Ufo: " + UfosPark.getUfoOf(client.getNumber()))
}
mostrarReserva(squanchy);

// Gearhead reserva ovni y pack.
// No tiene crédito.

console.log("\nLLega GearHead!\n" +
    "===============");
gearHead.pay(3000); // no tiene crédito
receptivo.dispatch(gearHead);
mostrarReserva(gearHead);

// Birdpearson es recibido en la fiesta

console.log("\nLLega Birdpearson!\n" +
    "==================");
var birdpearson = defineCreditCard("Birdpearson", "1111111111111111");
receptivo.dispatch(birdpearson);
mostrarReserva(birdpearson);

// Morty intenta reserver un ovni y un pack pero no quedan
console.log("\nMorty quiere pack y ovni pero no quedan :(\n" +
    "==========================================");
morty = defineCreditCard("Morty", "0000000000000000");
receptivo.dispatch(morty);
mostrarReserva(morty);


/**
 * A por el 10!! 
 * Wubba lubba dub dub!!
 * 
 * Añade otra tarea al receptivo,
 * de modo que 5 invitados:
 * abradolph, squanchy, morty, gearHead, birdpearson
 * encarguen un RickMenú junto 
 * al ovni y al pack de bienvenida.
 * Hay 100 RickMenús y su precio es de 10 EZIs.
 * Muestra el total de pedidos y la lista de
 * invitados/as (numero de tarjeta) que han hecho un pedido.
 

*/

var Menu = (function defineMenu() {
    var record = {
        amount: 100,
        price: 100,
        orders: []
    };

    var publicAPI = {
        dispatch,
        getOrders,
        getAmount
    }

    return publicAPI;

    function dispatch(client) {
        if (record.amount > 0 && client.pay(record.price)) {
            record.amount -= 1;
            record.orders.push(client.getName());
        }
    }

    function getOrders() {
        return record.orders;
    }

    function getAmount() {
        return record.amount;
    }
})();


receptivo.register(Menu);

var creditCards = [abradolph, squanchy, morty, gearHead, birdpearson];

for (let card of creditCards) {
    receptivo.dispatch(card);
}

console.log("\nPedidos de RickMenus:\n" +
    "=====================");
console.log(Menu.getOrders());

console.log("RickMenus restantes:\n" +
    "=====================");
console.log(Menu.getAmount());
console.log("\nCreditos de los invitados/as:\n" +
    "=============================");

for (let card of creditCards) {
    console.log(card.toString());
}