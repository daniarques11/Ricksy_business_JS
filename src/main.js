const instanceCreditCard = require("./credit-card").instanceCreditCard;
const instancePackExpender = require("./pack-expender").instancePackExpender;
const singletonUfosPark = require("./ufos-park").flota;
const singletonReceptivo = require("./receptivo").receptivo;
const singletonMenu = require("./menu").menu;

//Crear abradolph
var abradolph = instanceCreditCard("Abradolph Lincler", "4916119711304546");

//Crear ufosPark
var ufos = singletonUfosPark.getUfosPark();
console.log("\n" + "Tarjeta de Abradolph" + "\n" +
    "====================");
console.log(abradolph);

// Da de alta en la flota de ovnis los UFOS (solo los dos primeros)
const ufosJSON = require("../static/json/ufos.json").ufos;
for (let ufo of ufosJSON) {
    ufos.add(ufo);
    if (ufos.flota.size == 2) {
        break;
    }
}
console.log(ufos);

// Procesamos el pago y reserva de ovni de Abradolph
ufos.dispatch(abradolph);

// Mostramos el ID del ovni asignado a Abradolph
console.log("\nOvni de Abradolph" + " \n" +
    "=================");
console.log(ufos.print(ufos.getUfoOf(abradolph.number)) + "\n");
// Mostramos el credito de la tarjeta del cliente
console.log("Credito de Abradolph: " + abradolph.credit);

// La dualidad en Abradolph quiere reservar otro ovni.
// El sistema detecta que ya tiene uno 
// e ignora la petición.
console.log("\nAbradolph quiere otro ovni\n" +
    "==========================");
console.log("Su credito no ha cambiado: " + abradolph.credit);
console.log("Ovni de Abradolph: " + ufos.print(ufos.getUfoOf(abradolph.number)));

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
console.log("No puede reservar ovni: " + ufos.print(ufos.getUfoOf(gearHead.number)));

// Squanchy deja su ovni reservado
// antes de irse a squanchear
console.log("\nLLega Squanchy!\n" +
    "==============");
var squanchy = instanceCreditCard("Squanchy", "4444444444444444");
ufos.dispatch(squanchy);
console.log("Su credito es: " + squanchy.credit);
console.log("Su ovni es: " + ufos.print(ufos.getUfoOf(squanchy.number)));

// Morty quiere un ovni para huir de la fiesta
// pero ya no queda ninguno disponible
console.log("\nAlgun ovni para Morty?\n" +
    "======================");
var morty = instanceCreditCard("Morty", "0000000000000000");
ufos.dispatch(morty);
console.log("Su credito no ha cambiado: " + morty.credit);
console.log("No hay ovni Morty: " + ufos.print(ufos.getUfoOf(morty.number)));

// Metemos un ovni más en la flota de ovnis
// y mostramos la flota por consola
console.log("\nFlota de ovnis\n" +
    "==============");
ufos.add(ufosJSON[3]);
console.log(ufos);

// Crear expendedor de cristales
const packSelected = require("../static/json/pack.json")[0];
var packExpender = instancePackExpender(parseInt(packSelected.stock), parseInt(packSelected.precio));

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
var receptivo = singletonReceptivo.getReceptivo();
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
    let ufo = ufos.print(ufos.getUfoOf(client.number));
    console.log("Ufo: " + ufo);
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
var menu = singletonMenu.getMenu();
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