const instanceCreditCard = require("./credit-card").instanceCreditCard;
const singletonUfosPark = require("./ufos-park").singletonUfosPark;
const instancePackExpender = require("./pack-expender").instancePackExpender;
const singletonReceptivo = require("./receptivo").singletonReceptivo;
const singletonMenu = require("./menu").singletonMenu;
//TODO: Implementar modulo DISPATCHER



//Crear abradolph
var abradolph = instanceCreditCard("Abradolph Lincler", "4916119711304546");

//Crear ufosPark
var ufos = singletonUfosPark();
console.log("\n" + "Tarjeta de Abradolph" + "\n" +
    "====================");
console.log(abradolph);

// Da de alta en la flota de ovnis 2 UFOS.
var ufosID = ["unx", "dox"];
for (let ufo of ufosID) {
    ufos.add(ufo);
}
console.log(ufos);

//Añadir metodo dispatch al prototip de UfosPark
Object.getPrototypeOf(ufos).dispatch = function(client) {
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

// Procesamos el pago y reserva de ovni de Abradolph
ufos.dispatch(abradolph);

// Mostramos el ID del ovni asignado a Abradolph
console.log("\nOvni de Abradolph" + " \n" +
    "=================");
console.log(ufos.getUfoOf(abradolph.number) + "\n");
// Mostramos el credito de la tarjeta del cliente
console.log("Credito de Abradolph: " + abradolph.credit);

// La dualidad en Abradolph quiere reservar otro ovni.
// El sistema detecta que ya tiene uno 
// e ignora la petición.
console.log("\nAbradolph quiere otro ovni\n" +
    "==========================");
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

// Crear expendedor de cristales
var packExpender = instancePackExpender(3);

// Añadir metodo dispatch al expendedor de cristales
Object.getPrototypeOf(packExpender).dispatch = function dispatch(client) {
    if (this.amount > 0 && client.pay(this.price)) {
        this.amount -= 1;
    }
}

// Muestra el total de packs y su precio unidad
console.log("\nPacks\n" +
    "=====");
console.log(packExpender);

// Abradolph compra su pack de bienvenida
packExpender.dispatch(abradolph);
console.log("\nAbradolph compra su pack\n" +
    "========================");
console.log("Packs\n" + packExpender.amount);
console.log("Credito de Abradolph: " + abradolph.credit);

// El pobre GerHead no tiene crédito para comprar su pack
console.log("\nGearHead sin credito para su pack\n" +
    "=================================");
packExpender.dispatch(gearHead);
console.log("Packs\n" + packExpender.amount);
console.log("Credito de GearHead: " + gearHead.credit);

// Crear receptivo
var receptivo = singletonReceptivo();
receptivo.register(packExpender);
receptivo.register(ufos);

// Squanchy reserva ovni (ya tiene) y pack
console.log("\nLLega Squanchy!\n" +
    "===============");
receptivo.dispatch(squanchy);

//Creamos funcion para imprimir reserva de un cliente
function mostrarReserva(client) {
    console.log(client);
    console.log("Packs: " + packExpender.amount);
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

/* Crear Rick menu*/
var menu = singletonMenu();
receptivo.register(menu);

//Repartir menus
var creditCards = [abradolph, squanchy, morty, gearHead, birdpearson];
for (let card of creditCards) {
    receptivo.dispatch(card);
}
console.log("\nPedidos de RickMenus:\n" +
    "=====================");
console.log(menu);
console.log("\nCreditos de los invitados/as:\n" +
    "=============================");
for (let card of creditCards) {
    console.log(card);
}