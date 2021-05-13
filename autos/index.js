const fs = require('fs');

const autos_db = JSON.parse(fs.readFileSync('./data/autos.json','utf-8'));


const autos = {
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
    }
}

module.exports = autos