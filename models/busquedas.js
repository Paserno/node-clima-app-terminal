

class Busquedas{

    historial = ['Madrid', 'Santiago', 'Buenos Aires']

    constructor(){
        //TODO: Leer DB si existe
    }

    async ciudad( lugar = '' ){
        // Peticion HTTP
        console.log(lugar);
        
        return []; // retornar los lugares
    }
    
}

module.exports = Busquedas;