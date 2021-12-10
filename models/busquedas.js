const axios = require('axios');

class Busquedas{

    historial = ['Madrid', 'Santiago', 'Buenos Aires']

    constructor(){
        //TODO: Leer DB si existe
    }

    async ciudad( lugar = '' ){

        try {
            // Peticion HTTP
            // console.log('Ciudad:', lugar);
            const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log(resp.data);

            return [];
            
        } catch (error) {
            return [];
            
        }

        
        return []; // retornar los lugares
    }
    
}

module.exports = Busquedas;