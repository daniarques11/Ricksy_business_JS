const singletonReceptivo = require("./receptivo").receptivo;

var receptivo;
beforeAll(() => {
    receptivo = singletonReceptivo.getReceptivo();
})