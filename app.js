const process = require('process');
const { buscarAuto, venderAuto,autosParaLaVenta, autosNuevos, listaDeVentas, totalDeVentas, agregarAuto} = require('./autos');

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
    case 'agregar' : 
        let marca = process.argv[3];
        let modelo = process.argv[4];
        let precio = +process.argv[5];
        let km = +process.argv[6];
        let color = process.argv[7];
        let cuotas = +process.argv[8];
        let anio = +process.argv[9];
        let patente = process.argv[10];
        let vendido = process.argv[11];
        agregarAuto(marca,modelo,precio,km,color,cuotas,anio,patente,vendido)
        break;
    default:
        break;
}
