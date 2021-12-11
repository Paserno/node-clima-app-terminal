const axios = require('axios');

class Busquedas{

    historial = ['Madrid', 'Santiago', 'Buenos Aires']

    constructor(){
        //TODO: Leer DB si existe
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad( lugar = '' ){

        try {
            // Peticion HTTP
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const resp = await intance.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));// Retornar un objeto de forma implicita 

        } catch (error) {
            return [];  
        }
    }
    
    get paramsOpenWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async climaLugar(lat, lon){

     try {
        const intance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: {...this.paramsOpenWeather, lat, lon}

        });
        const resp = await intance.get();
       const { weather, main } = resp.data;
        return {
            desc: weather[0].description.toUpperCase(),
            min: main.temp_min,
            max: main.temp_max,
            temp: main.temp
        };


     } catch (error) {
         console.log(error);
     }   
        
    }


}

module.exports = Busquedas;