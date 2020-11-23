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
function CreditCard(name, number) {
    this.name = name;
    this.number = number;
    this.credit = 3000;
}
CreditCard.prototype.pay = function(amount) {
    if (amount <= this.credit) {
        this.credit -= amount;
        return true;
    } else {
        return false;
    }
}

function instanceCreditCard(name, number) {
    var card = new CreditCard(name, number);

    return card;
}
var abradolph = instanceCreditCard("Abradolph Lincler", "4916119711304546");

console.log("\n" + "Tarjeta de Abradolph" + "\n" +
    "====================");
console.log(abradolph);

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
function UfosPark() {
    this.fee = 500;
    this.flota = new Map();
}

var ufos = (function defineUfosPark() {
    var ufosParkInstance = new UfosPark();

    return ufosParkInstance;


})();
UfosPark.prototype.add = function(ufo) {
    if (!(this.flota.has(ufo))) {
        this.flota.set(ufo, null);
    }
}
UfosPark.prototype.getUfoOf = function(cardNumber) {
    for (let entry of this.flota.entries()) {
        if (entry[1] == cardNumber) return entry[0];
    }
    return null;
}
var ufosID = ["unx", "dox"];
for (let ufo of ufosID) {
    ufos.add(ufo);
}

console.log(ufos);

UfosPark.prototype.dispatch = function(client) {
    let assignUfo;
    if (Array.from(this.flota.values()).indexOf(client.number) == -1) {
        for (let entry of this.flota.entries()) {
            if (entry[1] == null) {
                assignUfo = entry;
                break;
            }
        }
    }
    if (assignUfo != null && client.pay(this.fee)) {
        this.flota.set(assignUfo[0], client.number);
    }
}

ufos.dispatch(abradolph);
// Mostramos el ID del ovni asignado a Abradolph
console.log("\nOvni de Abradolph" + " \n" +
    "=================");
console.log(ufos.getUfoOf(abradolph.number) + "\n");

// Mostramos el credito de la tarjeta del cliente
console.log("Credito de Abradolph: " + abradolph.credit);

// Procesamos el pago y reserva de ovni de Abradolph


// La dualidad en Abradolph quiere reservar otro ovni.
// El sistema detecta que ya tiene uno 
// e ignora la petición.

console.log("\nAbradolph quiere otro ovni\n" +
    "==========================");
ufos.dispatch(abradolph);
console.log("Su credito no ha cambiado: " + abradolph.credit);
console.log("Ovni de Abradolph: " + ufos.getUfoOf(abradolph.number));

// A GearHead le vacía la tarjeta el alien "Cámara Lenta" 
// mientras le daba la chapa, justo antes de pagar el ovni.
// Intenta reservarlo y el componente de reserva de ovnis
// no le asigna ninguno.

console.log("\nLLega GearHead!\n" +
    "===============");
var gearHead = instanceCreditCard("Gearhead", "8888888888888888");


gearHead.pay(3000); // le vacían la cartera

ufos.dispatch(gearHead);
console.log("Su credito es cero: " + gearHead.credit);
console.log("No puede reservar ovni: " + ufos.getUfoOf(gearHead.number));

// Squanchy deja su ovni reservado
// antes de irse a squanchear

console.log("\nLLega Squanchy!\n" +
    "==============");
var squanchy = instanceCreditCard("Squanchy", "4444444444444444");

ufos.dispatch(squanchy);
console.log("Su credito es: " + squanchy.credit);
console.log("Su ovni es: " + ufos.getUfoOf(squanchy.number));

// Morty quiere un ovni para huir de la fiesta
// pero ya no queda ninguno disponible

console.log("\nAlgun ovni para Morty?\n" +
    "======================");
var morty = instanceCreditCard("Morty", "0000000000000000");
ufos.dispatch(morty);
console.log("Su credito no ha cambiado: " + morty.credit);
console.log("No hay ovni Morty: " + ufos.getUfoOf(morty.number));

// Metemos un ovni más en la flota de ovnis
// y mostramos la flota por consola

console.log("\nFlota de ovnis\n" +
    "==============");
ufos.add("trex");
console.log(ufos);


/**
 * Construye el dispensador de packs de bienvenida.
 * Indica el numero de unidades y el coste de cada
 * uno de ellos, que es de 50 EZIs
 */

var PackExpender = {
    amount: 3,
    price: 50,
    dispatch: function(client) {
        if (this.amount > 0 && client.pay(this.price)) {
            this.amount -= 1;
        }
    }
};

// Muestra el total de packs y su precio unidad
console.log("\nPacks\n" +
    "=====");
console.log(PackExpender);

// Abradolph compra su pack de bienvenida
PackExpender.dispatch(abradolph);

console.log("\nAbradolph compra su pack\n" +
    "========================");
console.log("Packs\n" + PackExpender.amount);
console.log("Credito de Abradolph: " + abradolph.credit);

// El pobre GerHead no tiene crédito para comprar su pack
console.log("\nGearHead sin credito para su pack\n" +
    "=================================");
PackExpender.dispatch(gearHead);
console.log("Packs\n" + PackExpender.amount);
console.log("Credito de GearHead: " + gearHead.credit);


/**
 * Vamos a automatizar ahora ambas tareas, de modo que
 * cuando llega un invitado/a se le asiga un ovni
 * y un pack y se realiza el cargo a la tarjeta.
 * 
 * Para ello, crea el componente receptivo
 * y registra (añade) los componentes UfosPark
 * y CrystalDispatcher al receptivo
 */
console.log("                 eipfhweoifheoifhewoi");

var receptivo = {
    observers: [],
    register: function(observer) {
        this.observers.push(observer);
    },
    dispatch: function(client) {
        for (let observer of this.observers) {
            observer.dispatch(client);
        }
    }
}
receptivo.register(PackExpender);
receptivo.register(ufos);

// Implementa el metodo receptivo.dispatch()
// para que invoque a UfosPark.dispatch()
// y a CrystalExpender.dispatch()

// Squanchy reserva ovni (ya tiene) y pack

console.log("\nLLega Squanchy!\n" +
    "===============");
receptivo.dispatch(squanchy);

function mostrarReserva(client) {
    console.log(client);
    console.log("Packs: " + PackExpender.amount);
    console.log("Ufo: " + ufos.getUfoOf(client.number))
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
var birdpearson = instanceCreditCard("Birdpearson", "1111111111111111");
receptivo.dispatch(birdpearson);
mostrarReserva(birdpearson);

// Morty intenta reserver un ovni y un pack pero no quedan
console.log("\nMorty quiere pack y ovni pero no quedan :(\n" +
    "==========================================");
morty = instanceCreditCard("Morty", "0000000000000000");
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

var Menu = {
    amount: 100,
    price: 100,
    orders: [],
    dispatch: function(client) {
        if (this.amount > 0 && client.pay(this.price)) {
            this.amount -= 1;
            this.orders.push(client.name);
        }
    }
};


receptivo.register(Menu);

var creditCards = [abradolph, squanchy, morty, gearHead, birdpearson];

for (let card of creditCards) {
    receptivo.dispatch(card);
}

console.log("\nPedidos de RickMenus:\n" +
    "=====================");
console.log(Menu);

console.log("\nCreditos de los invitados/as:\n" +
    "=============================");

for (let card of creditCards) {
    console.log(card);
}