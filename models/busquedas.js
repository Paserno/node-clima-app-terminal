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
            const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Madrid.json?access_token=pk.eyJ1IjoiMjVwYXNzZXIiLCJhIjoiY2t4MHNxbHgwMTE0MzJ4b2I5NG5lMDEyYSJ9.Ygue2Jo8M_VgiGEayOKz-w&limit=5&language=es');
            console.log(resp.data);

            return [];
            
        } catch (error) {
            return [];
            
        }

        
        return []; // retornar los lugares
    }
    
}

module.exports = Busquedas;