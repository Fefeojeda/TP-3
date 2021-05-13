const process = require('process');
const { buscarAuto, venderAuto,autosParaLaVenta, autosNuevos, listaDeVentas, totalDeVentas} = require('./autos');

const comando = process.argv[2];

switch (comando) {
    case "buscar":
        if (process.argv[3]) {
            let resultado = buscarAuto(process.argv[3]);
            resultado ? console.log(resultado) : console.log("No hay resultados de su búsqueda.");
        } else {
            console.log("Ingrese la patente");
        }
        break;
    case "vender" :
        venderAuto(process.argv[3])
        break
    case "consultar":
        console.log(autosParaLaVenta())
        break
    case "nuevos" :
        console.log(autosNuevos());
        break
    case "ventas" :
        console.log(listaDeVentas());
        break
    case "total" :
        console.log(totalDeVentas());
        break
    case undefined :
        console.log('Por favor ingresa una acción');
    default:
        break;
}
