const fs = require('fs');

const autos_db = JSON.parse(fs.readFileSync('./data/autos.json','utf-8'));

const autos = {
    listar : () => {autos_db.forEach(auto => console.log(auto))
    },
    
    buscarAuto : function(patente){
        return autos_db.find(auto => auto.patente === patente)
    },
    venderAuto : function(patente){
        autos_db.map(auto => {
            if(auto.patente === patente){
                auto.vendido = true
            }
        })
        autos.guardarCambios(autos_db)
    },
    guardarCambios : function(autos){
        fs.writeFileSync('./data/autos.json',JSON.stringify(autos,null,2),'utf-8')
    },
    autosParaLaVenta : function(){
        return autos_db.filter(auto => auto.vendido === false)
    },
    autosNuevos : function(){
        return autos_db.filter(auto => auto.km < 200 && !auto.vendido)
    },
    listaDeVentas : function(){
        let autosVendidos = autos_db.filter(auto => auto.vendido);
        return autosVendidos.map(auto => auto.precio);
    },
    totalDeVentas : function(){
        return autos.listaDeVentas().reduce((acum,precio) => acum + precio)
    },
    agregarAuto : function(marca, modelo, precio, km, color, cuotas, anio, patente, vendido) {
        let verificacionNumber = anio+cuotas+km+precio 
        if (isNaN(verificacionNumber)) {
            let arrayDeErrores = [];
            isNaN(km) ? arrayDeErrores.push('km') : null;
            isNaN(precio) ? arrayDeErrores.push(' precio') : null;
            isNaN(cuotas) ? arrayDeErrores.push(' cuotas') : null;
            isNaN(anio) ? arrayDeErrores.push(' anio') : null;       
            console.log(`${arrayDeErrores} necesitan ser valores numericos`); 
            return
        }
        if (!(vendido === 'true' || vendido === 'false')) {
            console.log('Solo se acepta true o false en la sección vendido');
            return
        }
        console.log(patente);
        let autosPorPatente = autos_db.filter(element => element.patente == patente)
        if (autosPorPatente.length > 0) {
            console.log('El auto ya existe y es:');
            console.log(autosPorPatente);
            return
        }
        let nuevoAuto = {                              
            'marca': marca,
            'modelo': modelo,
            'precio': precio,
            'km': km,
            'color': color,
            'cuotas': cuotas,
            'anio': anio,
            'patente': patente,
            'vendido': vendido
        }
        autos_db.push(nuevoAuto)
        autos.guardarCambios(autos_db)
        console.log('Vehículo agregado con éxito')},
    borrarPorPatente : inputPatente => {
        let ubicacionPorPatente = autos_db.findIndex(element => element.patente === inputPatente)
        if (ubicacionPorPatente === -1){
            return console.log('No se encontró el auto con patente: '+inputPatente);
        }
        let copyAutos = autos_db    
        let borrado = copyAutos.splice(ubicacionPorPatente,1)
        autos.guardarCambios(copyAutos)
        console.log('El siguiente auto ha sido elminado');
        console.log(borrado);
        
    }
}
    
module.exports = autos